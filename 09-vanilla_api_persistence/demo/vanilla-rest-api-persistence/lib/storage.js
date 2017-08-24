'use strict';

const path = require('path');
const fs = require('fs');

/* Optional:
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Async'});

fs.writeFileAsync(...)
fs.readFileAsync(...)
*/

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!item) return Promise.reject(new Error('expected item'));

  const filePath = `${__dirname}/../data/${schemaName}/${item.id}.json`;
  ensureDirectoryExistence(filePath);

  return writeFileAsync(filePath, JSON.stringify(item))
    .then(() => item);
};

exports.fetchItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!id) return Promise.reject(new Error('expected id'));

  const filePath = `${__dirname}/../data/${schemaName}/${id}.json`;
  if (!fs.existsSync(path.dirname(filePath)))
    return Promise.reject(new Error('schema not found'));

  // TODO: Promise.reject(new Error('item not found'));

  return readFileAsync(filePath)
    .then(data => {
      // TODO: catch/reject parsing error
      return JSON.parse(data.toString());
    });
};

// https://stackoverflow.com/a/34509653
function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function promisify (fn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        });
    });
  };
}
