'use strict';

const url = require('url');
const querystring = require('querystring');

module.exports = function(req) {
  try {
    req.url = url.parse(req.url);
    req.url.query = querystring.parse(req.url.query);

    return Promise.resolve(req);
  } catch(err) {
    return Promise.reject(err);
  }
}
