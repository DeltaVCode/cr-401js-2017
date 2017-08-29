const debug = require('debug')('app:note');
const storage = require('../lib/storage');
const createError = require('http-errors');
const uuid = require('uuid/v4');

const Note = module.exports = function (name, content) {
  debug('constructor');

  this.id = uuid();
  this.name = name;
  this.content = content;
}

Note.createNote = function(body) {
  debug('createNote');
  if (!body) {
    return Promise.reject(createError(400, 'Note body is missing'));
  }

  let note = new Note(body.name, body.content);
  return storage.createItem('note', note);
}

Note.fetchNote = function(id) {
  debug(`fetchNote(${id})`);
  return storage.fetchItem('note', id);
}

Note.updateNote = function(id, body) {
  debug(`updateNote(${id})`);

  return storage.fetchItem('note', id)
    .then(note => {
      for (var prop in note) {
        if (prop === 'id') continue;

        if (prop in body) {
          note[prop] = body[prop];
        }
      }
      return note;
    });
}
