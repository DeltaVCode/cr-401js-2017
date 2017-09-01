'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('app:route/list');
const List = require('../model/list');

const router = module.exports = new Router();

router.post('/api/list', jsonParser, function (req, res, next) {
  debug('POST /api/list');
  req.body.created = new Date();
  new List(req.body).save()
    .then(list => res.json(list))
    .catch(next);
});

router.get('/api/list/:id', function (req, res, next) {
  debug(`GET /api/list/${req.params.id}`);
  List.findById(req.params.id)
    .populate('notes')
    .then(list => list ? res.json(list) : res.sendStatus(404))
    .catch(next);
});

router.delete('/api/list/:id', function (req, res, next) {
  debug(`DELETE /api/list/{req.params.id}`);
  List.findByIdAndRemove(req.params.id)
    .then(list => res.sendStatus(204))
    .catch(next);
});

router.put('/api/list/:id', function (req, res, next) {
  debug(`PUT /api/list/${req.params.id}`);
  List.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true })
    .then(list => res.json(list))
    .catch(next);
});
