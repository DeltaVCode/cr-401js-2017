'use strict';

const app = require('../server');
const request = require('supertest')(app)

describe('Express Infrastructure', function () {
  describe('without valid authorization', function () {
    it('should return 401 without Authorization', function () {
      return request.get('/404').expect(401);
    });

    it('should return 404 with non-Basic Authorization', function () {
      return request
        .get('/404')
        .set('Authorization', 'Awesome')
        .expect(404);
    });

    it('should return 401 without Authorization', function () {
      return request
        .get('/404')
        .set('Authorization', 'Basic ')
        .expect(401);
    });

    it('should return 401 without username', function () {
      return request
        .get('/404')
        .auth('', 'password')
        .expect(401);
    });

    it('should return 401 without password', function () {
      return request
        .get('/404')
        .auth('username', '')
        .expect(401);
    });
  });

  describe('with authorization header', function () {
    it('should return 404', function () {
      return request
        .get('/404')
        .auth('user', 'pass:word')
        .expect(404);
    });
  });

  it('should have CORS headers', function () {
    return request.get('/')
      .expect('Access-Control-Allow-Origin', '*');
  });
});
