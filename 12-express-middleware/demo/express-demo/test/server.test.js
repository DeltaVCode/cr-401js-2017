'use strict';
const app = require('../server');
const request = require('supertest')(app);
const { expect } = require('chai');

describe('Express Infrastructure', function () {
  it('should handle 404', function (done) {
    request
      .get('/404')
      .expect(404)
      .end(done);
  });
})
