const debug = require('debug')('app:server');

debug('DATABASE_URL', process.env.DATABASE_URL);

require('dotenv').config();

debug('DATABASE_URL', process.env.DATABASE_URL);

console.log(process.env.debug);
debug(`debug = ${process.env.debug}`);
