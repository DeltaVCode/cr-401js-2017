'use strict';

const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const noteSchema = Schema({
  title: { type: String, required: true },
  content: { type: String },
  created: { type: Date, required: true }
});

module.exports = mongoose.models.note || mongoose.model('note', noteSchema);
