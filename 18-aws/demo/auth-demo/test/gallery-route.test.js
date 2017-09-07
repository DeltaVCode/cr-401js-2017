'use strict';

const app = require('../server');
const request = require('supertest')(app);
const { expect } = require('chai');

const debug = require('debug')('app:test/gallery-route');

const Gallery = require('../model/gallery');
const User = require('../model/user');
require('../lib/mongoose-connect');

const example = require('./lib/examples');
const { user: exampleUser, gallery: exampleGallery } = example;

describe('Gallery Routes', function () {
  beforeEach(function () {
    return User.createUser(exampleUser)
      .then(user => this.testUser = user)
      .then(user => user.generateToken())
      .then(token => this.testToken = token);
  });
  afterEach(function () {
    delete this.testUser;
    delete this.testToken;

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
          .set({ 'Authorization': `Bearer ${this.testToken}` })
          .expect(404);
      });
    });
    describe('missing id', function () {
      it('should return 404', function () {
        return request
          .get('/api/gallery/deadbeefdeadbeefdeadbeef')
          .set({ 'Authorization': `Bearer ${this.testToken}` })
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
          .set({ 'Authorization': `Bearer ${this.testToken}` })
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
        it('should return 404', function () {
          return request
            .get(`/api/gallery/${this.testGallery._id}`)
            .set({
              Authorization: `Bearer ${this.hackerToken}`,
            })
            .expect(404);
        })
      });
    })
  });

  describe('DELETE /api/gallery/:id', function () {
    describe('invalid id', function () {
      it('should return 404', function () {
        return request
          .delete('/api/gallery/missing')
          .set({ 'Authorization': `Bearer ${this.testToken}` })
          .expect(404);
      });
    });
    describe('missing id', function () {
      it('should return 404', function () {
        return request
          .delete('/api/gallery/deadbeefdeadbeefdeadbeef')
          .set({ 'Authorization': `Bearer ${this.testToken}` })
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
          .delete(`/api/gallery/${this.testGallery._id}`)
          .set({ 'Authorization': `Bearer ${this.testToken}` })
          .expect(204)
          .expect(() => {
            return Gallery.findById(this.testGallery._id)
              .then(deleted => {
                expect(deleted).to.be.null
              });
          });
      });
      describe(`someone else's gallery`, function () {
        beforeEach(function () {
          return User.createUser({ username: 'imposter', email: 'imposter@example.com', password: 'hack' })
            .then(hacker => this.hacker = hacker)
            .then(hacker => hacker.generateToken())
            .then(hackerToken => this.hackerToken = hackerToken);
        })
        it('should return 404', function () {
          return request
            .delete(`/api/gallery/${this.testGallery._id}`)
            .set({ Authorization: `Bearer ${this.hackerToken}` })
            .expect(404);
        })
      });
    })
  });

  describe('PUT /api/gallery/:id', function () {
    describe('invalid id', function () {
      it('should return 404', function () {
        return request
          .put('/api/gallery/missing')
          .set({ 'Authorization': `Bearer ${this.testToken}` })
          .expect(404);
      });
    });
    describe('missing id', function () {
      it('should return 404', function () {
        return request
          .put('/api/gallery/deadbeefdeadbeefdeadbeef')
          .set({ 'Authorization': `Bearer ${this.testToken}` })
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
      describe(`authenticated user's gallery`, function () {
        it('should return a gallery', function () {
          return request
            .put(`/api/gallery/${this.testGallery._id}`)
            .set({ 'Authorization': `Bearer ${this.testToken}` })
            .send({ name: 'updated', desc: 'new desc' })
            .expect(200)
            .expect(res => {
              expect(res.body.name).to.equal('updated');
              expect(res.body).to.have.property('desc', 'new desc');
              expect(res.body.created).to.not.be.undefined;
            });
        });
      });
      describe(`someone else's gallery`, function () {
        beforeEach(function () {
          return User.createUser({ username: 'imposter', email: 'imposter@example.com', password: 'hack' })
            .then(hacker => this.hacker = hacker)
            .then(hacker => hacker.generateToken())
            .then(hackerToken => this.hackerToken = hackerToken);
        })
        it('should return 404', function () {
          return request
            .put(`/api/gallery/${this.testGallery._id}`)
            .set({ Authorization: `Bearer ${this.hackerToken}` })
            .send({ name: 'updated', desc: 'new desc' })
            .expect(404);
        })
      });
    })
  });
});
