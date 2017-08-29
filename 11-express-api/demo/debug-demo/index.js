const debug = require('debug')('app:server');

console.log(process.env.debug);
debug(`debug = ${process.env.debug}`);
