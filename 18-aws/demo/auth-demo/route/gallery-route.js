'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('app:route/gallery');

const Gallery = require('../model/gallery');
const bearerAuth = require('../lib/bearer-auth-middleware');
const router = module.exports = new Router();

router.post('/api/gallery', jsonParser, (req, res, next) => {
  debug('POST /api/gallery');

  new Gallery({
    ...req.body,
    userID: req.user._id
  }).save()
    .then(gallery => res.json(gallery))
    .catch(next);
});

router.get('/api/gallery/:id', (req, res, next) => {
  debug(`GET /api/gallery/${req.params.id}`);

  Gallery.findOne({ _id: req.params.id, userID: req.user._id })
    .then(gallery => gallery ? res.json(gallery) : res.sendStatus(404))
    .catch(next);
});

router.delete('/api/gallery/:id', (req, res, next) => {
  debug(`DELETE /api/gallery/${req.params.id}`);

  Gallery.findOneAndRemove({ _id: req.params.id, userID: req.user._id })
    .then(gallery => gallery ? res.sendStatus(204) : res.sendStatus(404))
    .catch(next);
});

router.put('/api/gallery/:id', jsonParser, (req, res, next) => {
  debug(`PUT /api/gallery/${req.params.id}`);

  const { _id, _v, update } = req.body;

  Gallery.findOneAndUpdate({ _id: req.params.id, userID: req.user._id }, req.body, { new: true })
    .then(gallery => gallery ? res.json(gallery) : res.sendStatus(404))
    .catch(next);
});
