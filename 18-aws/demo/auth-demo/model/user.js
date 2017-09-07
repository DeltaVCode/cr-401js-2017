'use strict';

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('app:model/user');

const Schema = mongoose.Schema;

const userSchema = Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  findHash: { type: String, unique: true },
});

userSchema.methods.generatePasswordHash = function (password) {
  debug('generatePasswordHash');

  return new Promise((resolve, reject) => {
    if (!password) return resolve(this);
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return reject(err);
      this.password = hash;
      resolve(this);
    });
  });
}

userSchema.methods.comparePasswordHash = function (password) {
  debug('comparePasswordHash');

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if (err) return reject(err);
      if (!valid)
        return reject(createError(401, 'username/password mismatch'));
      resolve(this);
    });
  });
}

userSchema.methods.generateFindHash = async function () {
  debug('generateFindHash');

  let tries = 0;
  while (true) {
    try {
      this.findHash = crypto.randomBytes(32).toString('hex');
      await this.save();
      return this.findHash;
    }
    catch (err) {
      if (tries > 3)
        throw err;
      debug('generateFindHash try ${++tries}');
    }
  }
};

userSchema.methods.generateToken = function () {
  debug('generateToken');

  return new Promise((resolve, reject) => {
    this.generateFindHash()
      .then(findHash => resolve(
        jwt.sign({ token: findHash }, process.env.APP_SECRET)
      ))
      .catch(reject);
  });
};

const User = module.exports = mongoose.models.user || mongoose.model('user', userSchema);

User.createUser = function(body) {
  debug('createUser', body);

  const { password, ..._user } = body;
  return new User(_user)
    .generatePasswordHash(password)
    .then(user => user.save());
}
