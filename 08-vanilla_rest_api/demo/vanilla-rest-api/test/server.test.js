'use strict';

const app = require('../server');
const request = require('supertest')(app);
const { expect } = require('chai');

describe('GET /', function () {
  it('should return routed', function (done) {
    request
      .get('/')
      .expect(200)
      .expect('routed')
      .expect('content-type', 'text/plain')
      .expect(res => {
        expect(res.files).to.be.undefined
      })
      .end(done);
  })
});
