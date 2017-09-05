'use strict';

const mongoose = require('mongoose');

mongoose.connection.db || mongoose.connect(process.env.MONGODB_URI);
