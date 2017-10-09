'use strict';
const app = require('../server');
const request = require('supertest')(app);
const { expect } = require('chai');

const List = require('../model/list');
const Note = require('../model/note');

describe('note routes', function () {
  describe('POST /api/note', function () {
    describe('with a valid body', function () {
      after(function () {
        return Note.remove({});
      });

      it('should return a note', function () {
        return request
          .post('/api/note')
          .send({ title: 'post note' })
          .expect(200)
          .expect(res => {
            expect(res.body.title).to.equal('post note');
            expect(res.body.created).to.not.be.undefined;
          });
      });
    });
  });

  describe('GET /api/note', function () {
    describe('with an invalid id', function () {
      it('should return 404', function () {
        return request
          .get('/api/note/oops')
          .expect(404);
      });
    });
    describe('with a valid id', function () {
      before(function () {
        return new Note({ title: 'get me', created: new Date() })
          .save()
          .then(note => this.testNote = note);
      });
      after(function () {
        return Note.remove({});
      });

      it('should return a note', function () {
        return request
          .get(`/api/note/${this.testNote._id}`)
          .expect(200)
          .expect(res => {
            expect(res.body.title).to.equal(this.testNote.title);
          })
      });
    });
  })

  describe('PUT /api/note/:id', function () {
    before(function () {
      return (
        new Note({
          title: 'update me',
          created: new Date()
        })
        .save()
        .then(saved => this.updateMe = saved)
      );
    });
    it('should return a thing', function () {
      return request
        .put(`/api/note/${this.updateMe._id}`)
        .expect(200);
    });
    it('should return 404 given missing id', function () {
      return request
        .put('/api/note/oops')
        .expect(404);
    })
  })
});

describe('list note routes', function () {
  describe('POST /api/list/:listId/note', function () {
    before(function () {
      return new List({ name: 'add note to me' })
        .save()
        .then(saved => this.testList = saved);
    });
    after(function () {
      return Promise.all([
        List.remove({}),
        Note.remove({}),
      ]);
    });

    it('should create note', function() {
      return request
        .post(`/api/list/${this.testList._id}/note`)
        .send({ title: 'new note' })
        .expect(200)
        .expect(res => {
          console.log('res.body', res.body);
          expect(res.body.title).to.equal('new note');
          // TODO: expect(res.body.list.name).to.equal('add note to me');
        });
    })
  });

  // TODO: request.get(`/api/list/${this.testList._id}/note/{this.testNote._id}`)
})
