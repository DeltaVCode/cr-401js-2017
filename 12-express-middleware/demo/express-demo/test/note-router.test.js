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
});
