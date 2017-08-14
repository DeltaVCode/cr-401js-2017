const assert = require('assert');

const hello = require('../lib/hello');

assert.strictEqual(hello.unitCircleCircumfrence(), Math.PI * 2);

assert.equal(hello.unitCircleArea(), Math.PI);
assert.strictEqual(hello.unitCircleArea(), Math.PI);

console.log('No tests failed!');
