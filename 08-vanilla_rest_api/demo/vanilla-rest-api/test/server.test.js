'use strict';

const request = require('superagent');
const { expect } = require('chai');

const app = require('../server');

describe('GET /', function () {
  it('should return routed', function (done) {
    request(app)
      .get('localhost:3000/')
      .end((err, res) => {
        if (err) return done(err);


        expect(res.status).to.equal(200);
        expect(res.text).to.equal('routed');
        done();
      })
  })
});
