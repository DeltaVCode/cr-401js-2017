'use strict';
const createError = require('http-errors');
const debug = require('debug')('app:error-middleware');

module.exports = function(err, req, res, next) {
  if (err.status) {
    debug('user error', err.message);
  }
  else {
    debug('server error');
    console.error(err);
    err = new createError.InternalServerError(err.message);
  }
  res.status(err.status).send(err.message);
  next();
};
