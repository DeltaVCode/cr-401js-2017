'use strict';

module.exports = exports = {};

exports.sendText = function(res, status, message) {
  res.writeHead(status, {
    'Content-Type': 'text/plain'
  });
  res.write(message);
  res.end();
}

exports.sendJSON = function(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json'
  });
  res.write(JSON.stringify(data));
  res.end();
}
