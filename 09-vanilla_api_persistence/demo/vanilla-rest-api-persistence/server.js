'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;

const Router = require('./lib/router');
const router = new Router();

require('./routes/note')(router);

const server = http.createServer(router.route());

if (!module.parent) {
  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
  });
}

module.exports = server;
