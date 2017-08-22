'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  console.log('req.url', req.url);
  console.log('req.method', req.method);

  req.url = url.parse(req.url);
  console.log('url', req.url);

  req.url.query = querystring.parse(req.url.query);
  console.log('qs', req.url.query);

  res.end();
});

server.listen(PORT, () => {
  console.log(`HTTP listening on ${PORT}`);
})
