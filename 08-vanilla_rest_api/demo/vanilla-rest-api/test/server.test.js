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
      .end((err, res) => {
        if (err) return done(err);

        expect(res.headers['content-type']).to.equal('text/plain');
        done();
      })
  })
});
