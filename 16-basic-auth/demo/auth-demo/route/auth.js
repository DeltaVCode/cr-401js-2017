'use strict';

const jsonParser = require('body-parser').json();
const debug = require('debug')('app:route/auth');
const Router = require('express').Router;

const basicAuth = require('../lib/basic-auth-middleware.js');

const User = require('../model/user');

const router = module.exports = new Router();

router.get('/api/signin', basicAuth, function (req, res, next) {
  debug('GET /api/signin');

  User.findOne({ username: req.auth.username })
    .then(user => user.comparePasswordHash(req.auth.password))
    .then(user => res.send('welcome'))
    .catch(next);
});
