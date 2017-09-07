'use strict';

if (process.env.AWS_ACCESS_KEY_ID) {
  module.exports = {};
  return;
}

const AWS = require('aws-sdk-mock');
const debug = require('debug')('app:test/aws-mocks');

module.exports = exports = {};

const mock = exports.uploadMock = {
  ETag: '"deadbeef"',
  Location: 'https://example.com/mock.png',
  Key: '1234.png',
  Bucket: process.env.AWS_BUCKET,
};
debug('uploadMock', mock);

AWS.mock('S3', 'upload', function (params, callback) {
  debug(params);
  if (params.ACL !== 'public-read') {
    return callback(new Error('ACL must be public-read'));
  }
  if (params.Bucket !== mock.Bucket) {
    return callback(new Error('Bucket is wrong'));
  }
  if (!params.Key) {
    return callback(new Error('Key is required'));
  }
  if (!params.Body) {
    return callback(new Error('Body is required'));
  }
  callback(null, mock);
});
