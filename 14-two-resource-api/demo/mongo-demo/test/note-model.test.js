'use strict';

const mongoose = require('mongoose');
const Note = require('../model/note');
const { expect } = require('chai');

const MONGODB_URI = process.env.MONGODB_URI ||
  'mongodb://localhost/401-notes';
mongoose.connection.db || mongoose.connect(MONGODB_URI);

describe('note model', function () {
  it('fails if title is missing', function () {
    let note = new Note({});

    return note.save()
      .catch(err => {
        expect(err.name).to.equal('ValidationError');
      });
  })
  it('can be saved', function () {
    let note = new Note({
      title: 'to-do',
      created: new Date(),
    });

    return note.save()
      .then(saved => {
        expect(saved.title).to.equal('to-do');
        expect(saved.created).to.not.be.undefined;
      })
  });

  describe('findById', function () {
    before(function () {
      return (
        new Note({
          title: 'find me',
          created: new Date()
        })
        .save()
        .then(saved => this.findMe = saved)
      );
    });

    it('can find by id', function() {
      return Note.findById(this.findMe._id)
        .then(found => {
          expect(found.title).to.equal('find me');
        })
    })
  })
})
