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

module.exports = mongoose.models.list ||
  mongoose.model('list', listSchema);
