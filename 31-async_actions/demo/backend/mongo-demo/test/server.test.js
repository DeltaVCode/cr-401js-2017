'use strict';
const app = require('../server');
const request = require('supertest')(app);

describe('server', function () {
  it ('should handle 404', function () {
    return request
      .get('/404')
      .expect(404);
  })
})
