'use strict';

const app = require('../server');
const request = require('supertest')(app);
const { expect } = require('chai');
const awsMocks = require('./lib/aws-mocks.js');

const debug = require('debug')('app:test/pic-route');

const Pic = require('../model/pic');
const Gallery = require('../model/gallery');
const User = require('../model/user');
require('../lib/mongoose-connect');

const example = require('./lib/examples');

debug(example);

describe('Pic Routes', function () {
  beforeEach(function setTestUser() {
    return User.createUser(example.user)
      .then(user => this.testUser = user)
      .then(user => user.generateToken())
      .then(token => this.testToken = token);
  });
  beforeEach(function setTestGallery() {
    return new Gallery({
      ...example.gallery,
      userID: this.testUser._id.toString(),
    }).save()
      .then(gallery => this.testGallery = gallery)
      .then(() => debug('testGallery', this.testGallery));
  });
  afterEach(function deleteEverything() {
    delete this.testUser;
    delete this.testToken;

    return Promise.all([
      User.remove({}),
      Gallery.remove({}),
      Pic.remove({}),
    ]);
  });

  describe('POST /api/gallery/:id/pic', function () {
    it('should return 401 without Authorization', function (){
      return request
        .post(`/api/gallery/${this.testGallery._id}/pic`)
        .expect(401);
    })
    it('should return 404 with file but bad id', function (){
      return request
        .post(`/api/gallery/deadbeefdeadbeefdeadbeef/pic`)
        .set({ Authorization: `Bearer ${this.testToken}`, })
        .field({
          name: example.pic.name,
          desc: example.pic.desc,
        })
        .attach('image', example.pic.image)
        .expect(404);
    });
    it('should return 400 without file', function (){
      return request
        .post(`/api/gallery/${this.testGallery._id}/pic`)
        .set({ Authorization: `Bearer ${this.testToken}`, })
        .expect(400);
    });
    it('should return 400 with file but missing fields', function (){
      return request
        .post(`/api/gallery/${this.testGallery._id}/pic`)
        .set({ Authorization: `Bearer ${this.testToken}`, })
        .attach('image', example.pic.image)
        .expect(400);
    });
    it('should return a pic', function () {
      return request
        .post(`/api/gallery/${this.testGallery._id}/pic`)
        .set({ Authorization: `Bearer ${this.testToken}`, })
        .field({
          name: example.pic.name,
          desc: example.pic.desc,
        })
        .attach('image', example.pic.image)
        .expect(200)
        .expect(res => {
          expect(res.body.name).to.equal(example.pic.name);
          expect(res.body.desc).to.equal(example.pic.desc);
          expect(res.body.userID).to.equal(this.testUser._id.toString());
          expect(res.body.galleryID).to.equal(this.testGallery._id.toString());

          if (awsMocks.Location) {
            expect(res.body.imageURI).to.equal(awsMocks.uploadMock.Location);
          } else {
            // TODO: validate imageURI
            expect(res.body.imageURI).to.not.be.undefined;
          }
        });
    });
  });
});
