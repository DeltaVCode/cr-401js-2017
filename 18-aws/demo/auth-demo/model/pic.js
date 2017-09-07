'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const picSchema = Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  imageURI: { type: String, required: true, unique: true },
  objectKey: { type: String, required: true, unique: true },

  userID: { type: Schema.Types.ObjectId, required: true },
  galleryID: { type: Schema.Types.ObjectId, required: true },

  created: { type: Date, required: true, default: Date.now },
})

module.exports = mongoose.models.pic ||
  mongoose.model('pic', picSchema);
