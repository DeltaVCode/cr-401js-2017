'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const debug = require('debug')('app:server');

const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI ||
  'mongodb://localhost/401-notes';

mongoose.Promise = Promise;
mongoose.connection.db || mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(require('./route/note'));
app.use(require('./lib/error-middleware'));

if (!module.parent) {
  app.listen(PORT, () => debug(`Listening on ${PORT}`));
}

module.exports = app;
