'use strict';
const app = require('../server');
const request = require('supertest')(app);
const { expect } = require('chai');

const List = require('../model/list');

describe('list routes', function () {
  describe('POST /api/list', function () {
    describe('with a valid body', function () {
      after(function () {
        return List.remove({});
      });

      it('should return a list', function () {
        return request
          .post('/api/list')
          .send({ name: 'post list' })
          .expect(200)
          .expect(res => {
            expect(res.body.name).to.equal('post list');
            expect(res.body.timestamp).to.not.be.undefined;
          });
      });
    });
  });

  describe('GET /api/list', function () {
    describe('with an invalid id', function () {
      it('should return 404', function () {
        return request
          .get('/api/list/oops')
          .expect(404);
      });
    });
    describe('with a valid id', function () {
      before(function () {
        return new List({ name: 'get me', created: new Date() })
          .save()
          .then(list => this.testList = list);
      });
      after(function () {
        return List.remove({});
      });

      it('should return a list', function () {
        return request
          .get(`/api/list/${this.testList._id}`)
          .expect(200)
          .expect(res => {
            expect(res.body.name).to.equal(this.testList.name);
          })
      });
    });
  })

  describe('PUT /api/list/:id', function () {
    before(function () {
      return (
        new List({
          name: 'update me',
          created: new Date()
        })
        .save()
        .then(saved => this.updateMe = saved)
      );
    });
    it('should return a thing', function () {
      return request
        .put(`/api/list/${this.updateMe._id}`)
        .expect(200);
    });
    it('should return 404 given missing id', function () {
      return request
        .put('/api/list/oops')
        .expect(404);
    })
  })
});
