'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('app:route/gallery');

const Gallery = require('../model/gallery');
const bearerAuth = require('../lib/bearer-auth-middleware');
const router = module.exports = new Router();

router.use('/api/gallery*', bearerAuth);

router.post('/api/gallery', jsonParser, (req, res, next) => {
  debug('POST /api/gallery');

  new Gallery(req.body)
    .save()
    .then(gallery => res.json(gallery))
    .catch(next);
});

router.get('/api/gallery/:id', (req, res, next) => {
  debug(`GET /api/gallery/${req.params.id}`);

  Gallery.findById(req.params.id)
    .then(gallery => {
      if (!gallery)
        return res.sendStatus(404);

      if (gallery.userID.toString() !== req.user._id.toString())
        return next(createError(401, 'permission denied'));

      res.json(gallery);
    })
    .catch(next);
});
