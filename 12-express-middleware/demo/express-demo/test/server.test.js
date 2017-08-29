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
  it('should include CORS headers', function(done) {
    request
      .get('/404')
      .expect('Access-Control-Allow-Headers', '*')
      .expect('Access-Control-Allow-Origin', '*')
      .end(done);
  })
  it.skip('should handle 500', function (done) {
    request
      .get('/500')
      .expect(500)
      .end(done);
  });
})
