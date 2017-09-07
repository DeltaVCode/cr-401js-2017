'use strict';

const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
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

userSchema.methods.generatePasswordHash = async function (password) {
  debug('generatePasswordHash');

  if (!password) return this;
  this.password = await bcrypt.hashAsync(password, 10);
  return this;
}

userSchema.methods.comparePasswordHash = async function (password) {
  debug('comparePasswordHash');

  let valid = await bcrypt.compareAsync(password, this.password);
  if (!valid)
    throw createError(401, 'username/password mismatch');
  return this;
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

userSchema.methods.generateToken = async function () {
  debug('generateToken');

  let findHash = await this.generateFindHash();
  return jwt.sign({ token: findHash }, process.env.APP_SECRET);
};

const User = module.exports = mongoose.models.user || mongoose.model('user', userSchema);

User.createUser = async function(body) {
  debug('createUser', body);

  const { password, ..._user } = body;
  let user = new User(_user);
  await user.generatePasswordHash(password);
  return await user.save();
}
