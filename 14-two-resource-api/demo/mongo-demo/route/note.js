'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('note:route');
const Note = require('../model/note');

const router = module.exports = new Router();

router.post('/api/note', jsonParser, function (req, res, next) {
  debug('POST /api/note');
  req.body.created = new Date();
  new Note(req.body).save()
    .then(note => res.json(note))
    .catch(next);
});

router.get('/api/note/:id', function (req, res, next) {
  debug(`GET /api/note/${req.params.id}`);
  Note.findById(req.params.id)
    .then(note => res.json(note))
    .catch(next);
});

//router.delete('')

router.put('/api/note/:id', function (req, res, next) {
  debug(`PUT /api/note/${req.params.id}`);
  Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true })
    .then(note => res.json(note))
    .catch(next);
});
