'use strict';

const Router = require('express').Router;
const multer = require('multer');
const createError = require('http-errors');
const debug = require('debug')('app:route/pic');

const Pic = require('../model/pic');
const Gallery = require('../model/gallery');
const bearerAuth = require('../lib/bearer-auth-middleware');
const router = module.exports = new Router();

// TODO: routes
