'use strict';

const parseUrl = require('./parse-url');
const parseJSON = require('./parse-json');

const Router = module.exports = function() {
  this.routes = {
    GET: {},
    POST: {},
  };
};

Router.prototype.get = function(path, callback) {
  this.routes.GET[path] = callback;
};
Router.prototype.post = function(path, callback) {
  this.routes.POST[path] = callback;
};

Router.prototype.route = function() {
  console.log(this.routes);

  return (req, res) => {
    Promise.all([
      parseUrl(req),
      parseJSON(req),
    ]).then(() => {
        console.log(req.method, req.url.href);

        let methodRoutes = this.routes[req.method];
        console.log(methodRoutes);
        if(!methodRoutes) throw new Error(`I don't speak ${req.method}`);

        let pathCallback = methodRoutes[req.url.pathname];
        console.log(pathCallback);
        if (typeof pathCallback === 'function') {
          return pathCallback(req, res);
        }

        res.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        res.write('Not Found');
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        });
        res.write(err.message);
        res.end();
      });
  };
};
