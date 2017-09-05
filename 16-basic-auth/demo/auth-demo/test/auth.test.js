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
  describe('GET /api/signin', function () {
    before(function () {
      return new User(exampleUser)
        .generatePasswordHash(exampleUser.password)
        .then(user => user.save())
        .then(user => this.testUser = user);
    });
    after(function () {
      return User.remove({});
    });

    it('should sign in', function () {
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
      after(function () {
        return User.remove({});
      });

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

    // TODO: Test invalid bodies!
  });
});
