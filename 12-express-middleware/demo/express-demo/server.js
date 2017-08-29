'use strict';
const express = require('express');
const debug = require('debug')('app:server');

const PORT = process.env.PORT || 3000;
const app = module.exports = express();

debug('server parent',
  module.parent && module.parent.filename);
if (!module.parent) {
  app.listen(PORT, () => {
    debug(`Listening on ${PORT}...`);
  });
}
