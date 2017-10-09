'use strict';
const app = require('../server');
const request = require('supertest')(app);
const { expect } = require('chai');

const List = require('../model/list');
const Note = require('../model/note');

describe('list routes', function () {
  describe('GET /api/lists', function () {
    before(function () {
      return new List({ name: 'get me', created: new Date() })
        .save()
        .then(list => this.testList = list);
    });
    after(function () {
      return List.remove({});
    });

    it('should return all lists', function() {
      return request.get('/api/lists')
        .expect(200)
        .expect(res => {
          console.log(res.body)
          expect(res.body.length).to.be.above(0);
          expect(res.body[res.body.length - 1]._id).to.equal(this.testList._id.toString());
        })
    })
  })
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
    describe('with an invalid id that looks like an id', function () {
      it('should return 404', function () {
        return request
          .get('/api/list/deadbeefdeadbeefdeadbeef')
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

    describe('with a valid id containing notes', function () {
      before(function () {
        return new List({ name: 'get me', created: new Date() })
          .save()
          .then(list => {
            this.testList = list;
            return List.findByIdAndAddNote(list._id, { title: 'me too' })
              .then(note => this.testNote = note);
          });
      });
      after(function () {
        return Promise.all([
          List.remove({}),
          Note.remove({}),
        ]);
      });

      it('should return a list', function () {
        return request
          .get(`/api/list/${this.testList._id}`)
          .expect(200)
          .expect(res => {
            expect(res.body.name).to.equal(this.testList.name);
            expect(res.body.notes).to.not.be.empty;
            console.log(res.body);
            expect(res.body.notes[0].title).to.equal('me too');
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

  describe('DELETE /api/list/:id', function () {
    before(function () {
      return new List({ name: 'delete me' })
        .save()
        .then(saved => this.deleteMe = saved);
    });
    after(function () {
      return List.remove({});
    });

    it('should delete the list', function () {
      return request
        .delete(`/api/list/${this.deleteMe._id}`)
        .expect(204)
        .then(() => {
          return Promise.all([
            List.findById(this.deleteMe._id)
              .then(list => expect(list).to.be.null),
            request.get(`/api/list/${this.deleteMe._id}`).expect(404),
          ]);
        })
    })
  });
});
