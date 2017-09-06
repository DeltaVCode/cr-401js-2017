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
  afterEach(function () {
    return Promise.all([
      User.remove({}),
      Gallery.remove({}),
    ]);
  });

  describe('POST /api/gallery', function () {
      xit('should return a gallery', function () {
        return request
          .post('/api/gallery')
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
          .get('/api/gallery/missing').expect(404);
      });
    });
    describe('missing id', function () {
      it('should return 404', function () {
        return request
          .get('/api/gallery/deadbeefdeadbeefdeadbeef').expect(404);
      });
    });
    describe('valid id', function () {
      before(function () {
        return User.createUser(exampleUser)
          .then(user => this.testUser = user);
      });
      before(function () {
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
          .expect(200)
          .expect(res => {
            expect(res.body.name).to.equal(exampleGallery.name);
            expect(res.body).to.have.property('desc', exampleGallery.desc);
            expect(res.body.created).to.not.be.undefined;
          });
      });
    })
  });
});
