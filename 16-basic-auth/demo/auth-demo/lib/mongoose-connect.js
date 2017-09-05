'use strict';

const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connection.db || mongoose.connect(process.env.MONGODB_URI);
