'use strict';

const app = require('../server');
const request = require('supertest')(app);
const { expect } = require('chai');

const debug = require('debug')('app:test/gallery-route');

const Gallery = require('../model/gallery');
const User = require('../model/user');
require('../lib/mongoose-connect');

const exampleUser = {
  username: 'example',
  password: 'password!',
  email: 'example@example.com',
};

const exampleGallery = {
  name: 'test gallery',
  desc: 'amazing test gallery description',
};

describe('Gallery Routes', function () {
  beforeEach(function () {
    return User.createUser(exampleUser)
      .then(user => this.testUser = user)
      .then(user => user.generateToken())
      .then(token => this.testToken = token);
  });
  afterEach(function () {
    return Promise.all([
      User.remove({}),
      Gallery.remove({}),
    ]);
  });
  describe('POST /api/gallery', function () {
      it('should return a gallery', function () {
        return request
          .post('/api/gallery')
          .set({
            Authorization: `Bearer ${this.testToken}`,
          })
          .send(exampleGallery)
          .expect(200)
        .expect(res => {
          expect(res.body.name).to.equal(exampleGallery.name);
          expect(res.body).to.have.property('desc', exampleGallery.desc);
          expect(res.body.created).to.not.be.undefined;
        });
    });
  });

  describe('GET /api/gallery/:id', function () {
    describe('invalid id', function () {
      it('should return 404', function () {
        return request
          .get('/api/gallery/missing')
          .set({
            'Authorization': `Bearer ${this.testToken}`,
          })
          .expect(404);
      });
    });
    describe('missing id', function () {
      it('should return 404', function () {
        return request
          .get('/api/gallery/deadbeefdeadbeefdeadbeef')
          .set({
            'Authorization': `Bearer ${this.testToken}`,
          })
          .expect(404);
      });
    });
    describe('valid id', function () {
      beforeEach(function () {
        // NO: exampleGallery.userID = this.testUser._id.toString();
        return new Gallery({
          ...exampleGallery,
          userID: this.testUser._id.toString(),
        }).save()
          .then(gallery => this.testGallery = gallery);
      });
      it('should return a gallery', function () {
        return request
          .get(`/api/gallery/${this.testGallery._id}`)
          .set({
            'Authorization': `Bearer ${this.testToken}`,
          })
          .expect(200)
          .expect(res => {
            expect(res.body.name).to.equal(exampleGallery.name);
            expect(res.body).to.have.property('desc', exampleGallery.desc);
            expect(res.body.created).to.not.be.undefined;
          });
      });
      describe(`someone else's gallery`, function () {
        beforeEach(function () {
          return User.createUser({ username: 'imposter', email: 'imposter@example.com', password: 'hack' })
            .then(hacker => this.hacker = hacker)
            .then(hacker => hacker.generateToken())
            .then(hackerToken => this.hackerToken = hackerToken);
        })
        it('should return 401', function () {
          return request
            .get(`/api/gallery/${this.testGallery._id}`)
            .set({
              Authorization: `Bearer ${this.hackerToken}`,
            })
            .expect(401);
        })
      });
    })
  });
});
