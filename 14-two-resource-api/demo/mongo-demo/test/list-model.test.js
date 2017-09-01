'use strict';

const mongoose = require('mongoose');
const List = require('../model/list');
const { expect } = require('chai');

const MONGODB_URI = process.env.MONGODB_URI ||
  'mongodb://localhost/401-notes';
mongoose.connection.db || mongoose.connect(MONGODB_URI);

describe('list model', function () {
  it('fails if name is missing', function () {
    let list = new List({});

    return list.save()
      .catch(err => {
        expect(err.name).to.equal('ValidationError');
      });
  })
  it('can be saved', function () {
    let list = new List({
      name: 'to-do',
    });

    return list.save()
      .then(saved => {
        expect(saved.name).to.equal('to-do');
      })
  });

  describe('findById', function () {
    before(function () {
      return (
        new List({
          name: 'find me',
        })
        .save()
        .then(saved => this.findMe = saved)
      );
    });

    it('can find by id', function() {
      return List.findById(this.findMe._id)
        .then(found => {
          expect(found.name).to.equal('find me');
        })
    })
  })

  describe('findByIdAndUpdate', function () {
    before(function () {
      return (
        new List({
          name: 'update me',
        })
        .save()
        .then(saved => this.updateMe = saved)
      );
    });

    it('should find by id and update', function () {
      return List.findByIdAndUpdate(
        this.updateMe._id,
        { name: 'updated' },
        { new: true })
        .then(list => {
          expect(list.name).to.equal('updated');
        });
    })
  });

  describe('findByIdAndRemove', function () {
    before(function () {
      return new List({ name: 'delete me' })
        .save()
        .then(saved => this.deleteMe = saved);
    });

    it('should find by id and delete', function () {
      return List.findByIdAndRemove(this.deleteMe._id)
        .then(note => {
          return List.findById(this.deleteMe._id)
            .then(deleted => {
              expect(deleted).to.be.null
            });
        });
    })
  });

  describe('findByIdAndAddNote', function () {;
    before(function () {
      return (
        new List({
          name: 'add list to me',
        })
        .save()
        .then(saved => this.testList = saved)
      );
    });

    it('should add note to list', function () {
      return List.findByIdAndAddNote(
        this.testList._id,
        { title: 'note' })
        .then(note => {
          expect(note.title).to.equal('note');
          expect(note.listID.toString())
            .to.equal(this.testList._id.toString());

          return List.findById(this.testList._id)
            .then(list => {
              expect(list.notes.length).to.equal(1);
              expect(list.notes[0].toString())
                .to.equal(note._id.toString());
            });
        });
    });
  })
})
