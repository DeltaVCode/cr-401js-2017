'use strict';

const app = require('../server');
const request = require('supertest')(app);
const { expect } = require('chai');

describe('Routes', function () {
  it('should return routed for /', function (done) {
    request
      .get('/')
      .expect(200)
      .expect('routed')
      .expect('content-type', 'text/plain')
      .expect(res => {
        expect(res.files).to.be.undefined
      })
      .end(done);
  });

  it('should return Not Found for missing path', function (done) {
    request
      .get('/404')
      .expect(404)
      .expect('Not Found')
      .expect('content-type', 'text/plain')
      .end(done);
  });

  it('should return Not Found for POST missing path', function (done) {
    request
      .post('/404')
      .expect(404)
      .expect('Not Found')
      .expect('content-type', 'text/plain')
      .end(done);
  });
});
