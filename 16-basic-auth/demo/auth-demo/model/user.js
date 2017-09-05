'use strict';

const bcrypt = require('bcrypt');
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

userSchema.methods.generateFindHash = function () {
  debug('generateFindHash');
  // TODO: implement
}

userSchema.methods.generateToken = function () {
  debug('generateToken');
  // TODO: implement
}

module.exports = mongoose.models.user || mongoose.model('user', userSchema);
