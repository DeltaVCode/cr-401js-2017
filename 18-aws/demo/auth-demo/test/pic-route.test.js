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
  beforeEach(async function setTestUser() {
    this.testUser = await User.createUser(example.user);
    this.testToken = await this.testUser.generateToken();
  });
  beforeEach(async function setTestGallery() {
    this.testGallery = new Gallery({
      ...example.gallery,
      userID: this.testUser._id.toString(),
    });
    await this.testGallery.save();
  });
  afterEach(async function deleteEverything() {
    delete this.testUser;
    delete this.testToken;
    delete this.testGallery;

    await User.remove({});
    await Gallery.remove({});
    await Pic.remove({});
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
