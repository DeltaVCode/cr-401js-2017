'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;

const Router = require('./lib/router');
const router = new Router();

router.get('/', (req, res) => {
  console.log(req.method, req.url.href);
  console.log('body', req.body);

  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.write('routed');
  res.end();
});

const uuid = require('uuid');
var storage = {};

router.post('/note', (req, res) => {
  let note = Object.assign({
    id: uuid.v1(),
  }, req.body);
  storage[note.id] = note;
  console.log(note);

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write(JSON.stringify(note));
  res.end();
});

router.get('/note', (req, res) => {
  if (!req.url.query.id) {
    // Bad request
    return res.end();
  }

  var note = storage[req.url.query.id];
  if (note) {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(note));
    res.end();
  } else {
    // 404
    res.end();
  }
});

const server = http.createServer(router.route());

if (!module.parent) {
  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
  });
}

module.exports = server;
