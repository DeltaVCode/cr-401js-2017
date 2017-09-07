'use strict';

const createError = require('http-errors');
const debug = require('debug')('app:basic-auth-middleware');

module.exports = function (req, res, next) {
  debug('auth');

  let authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(createError(401, 'authorization header is required'));
  }

  let base64str = authHeader.split('Basic ')[1];
  if (!base64str) {
    return next(createError(401, 'username and password are required'));
  }

  var utf8str = new Buffer(base64str, 'base64').toString();
  var [ username, password ] = utf8str.split(':', 2);
  // TODO: handle passwords with colons using indexOf/substring OR RegExp
  debug({ username, password });

  req.auth = { username, password };

  if (!req.auth.username) {
    return next(createError(401, 'username is required'));
  }
  if (!req.auth.password) {
    return next(createError(401, 'password is required'));
  }

  next();
};
