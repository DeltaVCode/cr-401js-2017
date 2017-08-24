'use strict';

const app = require('../server');
const request = require('supertest')(app);
const { expect } = require('chai');

describe('Routes', function () {
  it('should return routed for /', function (done) {
    request
      .get('/')
      .expect(200)
      .expect('routed')
      .expect('content-type', 'text/plain')
      .expect(res => {
        expect(res.files).to.be.undefined
      })
      .end(done);
  });

  it('should return Not Found for missing path', function (done) {
    request
      .get('/404')
      .expect(404)
      .expect('Not Found')
      .expect('content-type', 'text/plain')
      .end(done);
  });

  it('should return Not Found for POST missing path', function (done) {
    request
      .post('/404')
      .expect(404)
      .expect('Not Found')
      .expect('content-type', 'text/plain')
      .end(done);
  });
});

describe('Simple Resource', function () {
  var note = null;

  describe('POST /note', function() {
    it('should save body', function (done) {
      request.post('/note')
        .send({ note: 'this is a note' })
        .expect(200)
        .expect(res => {
          expect(res.body.note).to.equal('this is a note');
          expect(res.body.id).to.not.be.empty;
          note = res.body;
        })
        .end(done);
    });
  });

  describe('GET /note', function() {
    it('should return a note', function (done) {
      request.get(`/note?id=${note.id}`)
        .expect(200)
        .expect(res => {
          expect(res.body.note).to.equal(note.note);
          expect(res.body.id).to.equal(note.id);
        })
        .end(done);
    });
  });
});
