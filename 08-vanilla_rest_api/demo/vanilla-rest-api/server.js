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

const server = http.createServer(router.route());

if (!module.parent) {
  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
  });
}

module.exports = server;
