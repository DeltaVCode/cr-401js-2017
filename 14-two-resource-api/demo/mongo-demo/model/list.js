'use strict';

const debug = require('debug')('app:list');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Note = require('./note');

const listSchema = Schema({
  name: { type: String, required: true },
  timestamp: { type: Date, required: true,
    default: Date.now },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'note',
  }],
});

const List = module.exports = mongoose.models.list ||
  mongoose.model('list', listSchema);

List.findByIdAndAddNote = function (id, note) {
  debug('findByIdAndAddNote');

  return List.findById(id)
    .then(list => {
      note.listID = list._id;
      debug(list);
      return new Note(note)
        .save()
        .then(savedNote => {
          debug(savedNote);
          list.notes.push(savedNote._id);
          return list.save()
            .then(listWithNote => debug(listWithNote))
            .then(() => savedNote);
        })
    });
}
