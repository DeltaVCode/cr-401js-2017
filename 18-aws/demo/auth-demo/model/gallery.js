'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const gallerySchema = Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  created: { type: Date, required: true, default: Date.now },
  userID: { type: Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.models.gallery ||
  mongoose.model('gallery', gallerySchema);
