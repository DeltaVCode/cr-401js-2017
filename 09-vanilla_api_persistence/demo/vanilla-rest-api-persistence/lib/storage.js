'use strict';

const path = require('path');
const fs = require('fs');

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!item) return Promise.reject(new Error('expected item'));

  const filePath = `${__dirname}/../data/${schemaName}/${item.id}.json`;
  ensureDirectoryExistence(filePath);

  return new Promise((resolve, reject) => {
    fs.writeFile(
      filePath,
      JSON.stringify(item),
      err => {
        if (err) return reject(err);
        resolve(item);
      });
  });
};

exports.fetchItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(new Error('expected schema name'));
    if (!id) return reject(new Error('expected id'));

    const filePath = `${__dirname}/../data/${schemaName}/${id}.json`;
    if (!fs.existsSync(path.dirname(filePath)))
      return reject(new Error('schema not found'));

    // TODO: reject(new Error('item not found'));

    var data = fs.readFileSync(filePath);
    // TODO: catch/reject parsing error
    var item = JSON.parse(data.toString());
    resolve(item);
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
