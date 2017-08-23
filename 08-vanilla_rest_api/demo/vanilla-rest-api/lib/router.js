'use strict';

const parseUrl = require('./parse-url');
const parseJSON = require('./parse-json');

const Router = module.exports = function() {
};

Router.prototype.route = function() {
  return (req, res) => {
     console.log(req.method, req.url);

     res.write('routed');
     res.end();
  };
};
