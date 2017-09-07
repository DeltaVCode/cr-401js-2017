'use strict';

const app = require('../server');
const request = require('supertest')(app)

describe('Express Infrastructure', function () {
  it('should return 404', function () {
    return request
      .get('/404')
      .expect(404);
  });

  it('should have CORS headers', function () {
    return request.get('/')
      .expect('Access-Control-Allow-Origin', '*');
  });
});
