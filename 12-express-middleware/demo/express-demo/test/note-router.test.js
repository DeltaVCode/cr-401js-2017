'use strict';
const app = require('../server');
const request = require('supertest')(app);
const { expect } = require('chai');
const Note = require('../model/note');

describe('/api/note routes', function () {
  const exampleNote = new Note('Thing to do', 'Content of note');
  describe('POST', function () {
    it('should return 200 with JSON of note', function (done) {
      request
        .post('/api/note')
        .send(exampleNote)
        .expect(200)
        .expect(res => {
          expect(res.body.name).to.equal(exampleNote.name);
          expect(res.body.content).to.equal(exampleNote.content);
        })
        .end(done);
    });
  });

  describe('PUT', function () {
    before(function (done) {
      Note.createNote(exampleNote)
        .then(note => {
          this.putNote = note;
          done();
        })
        .catch(done);
    });
    after(function (done) {
      if (this.putNote) {
        // TODO: Note.deleteNote(this.putNote.id);
        done();
      }
    });

    it('should update a note by id', function (done) {
      request
        .put(`/api/note?id=${this.putNote.id}`)
        .send({ name: 'updated', newProp: 'should not be found' })
        .expect(200)
        .expect(res => {
          expect(res.body.id).to.equal(this.putNote.id);
          expect(res.body.name).to.equal('updated');
          expect(res.body.content).to.equal(this.putNote.content);
          expect(res.body.newProp).to.be.undefined;
        })
        .expect({
          id: this.putNote.id,
          name: 'updated',
          content: this.putNote.content
        })
        /*
        .expect({
          ...this.putNote,
          name: 'updated'
        })
        */
        .end(done);
    })
  })
});
