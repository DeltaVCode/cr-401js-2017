'use strict';

const response = require('../lib/response');

module.exports = function (router) {
  router.get('/', (req, res) => {
    console.log(req.method, req.url.href);
    console.log('body', req.body);

    response.sendText(res, 200, 'routed');
  });

  const uuid = require('uuid');
  var storage = {};

  router.post('/note', (req, res) => {
    let note = Object.assign({
      id: uuid.v1(),
    }, req.body);
    storage[note.id] = note;
    console.log(note);

    response.sendJSON(res, 200, note);
  });

  router.get('/note', (req, res) => {
    if (!req.url.query.id) {
      response.sendText(res, 400, 'bad request');
    }

    var note = storage[req.url.query.id];
    if (note) {
      response.sendJSON(res, 200, note);
    } else {
      response.sendText(res, 404, 'not found');
    }
  });

}
