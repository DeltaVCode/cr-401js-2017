'use strict';

module.exports = function(req) {
  if (req.method !== 'POST' && req.method !== 'PUT') {
    return Promise.resolve(req);
  }

  if (req.headers['content-type'] !== 'application/json') {
    return Promise.resolve(req);
  }

  return new Promise(function(resolve, reject) {
    var body = '';
    req.on('data', data => body += data.toString());

    req.on('error', err => {
      console.error(err);
      reject(err);
    });

    req.on('end', () => {
      try {
        req.body = JSON.parse(body);
        resolve(req);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  });
}
