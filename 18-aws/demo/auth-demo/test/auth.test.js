'use strict';

const app = require('../server');
const request = require('supertest')(app);
const { expect } = require('chai');

const debug = require('debug')('app:test/auth');

const User = require('../model/user');
require('../lib/mongoose-connect');

const exampleUser = {
  username: 'example',
  password: 'password!',
  email: 'example@example.com',
};

describe('Auth Routes', function () {
  afterEach(async function () {
    delete this.testUser;

    await User.remove({});
  });

  describe('GET /api/signin', function () {
    beforeEach(async function () {
      this.testUser = await User.createUser(exampleUser);
    });

    it('should sign in', function () {
      debug('should sign in', exampleUser);
      return request
        .get('/api/signin')
        .auth(exampleUser.username, exampleUser.password)
        .expect(200)
        .expect(res => {
          expect(res.text.substring(0, 36)).to.equal('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
        });
    });
  });

  describe('POST /api/signup', function () {
    describe('with a valid body', function () {
      it('should succeed', function () {
        return request
          .post('/api/signup')
          .send(exampleUser)
          .expect(200)
          .expect(res => {
            expect(res.text.substring(0, 36)).to.equal('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
          });
      });
    });

    describe('without body', function () {
      it('should fail', function () {
        return request
          .post('/api/signup')
          .expect(400);
      });
    });

    describe('with password only', function () {
      it('should fail', function () {
        return request
          .post('/api/signup')
          .send({ password: 'password!' })
          .expect(400);
      });
    });

    describe('with valid body other than password', function () {
      it('should fail', function () {
        return request
          .post('/api/signup')
          .send({ username: 'ejemplo', email: 'ejemplo@example.com' })
          .expect(400);
      });
    });
  });
});
