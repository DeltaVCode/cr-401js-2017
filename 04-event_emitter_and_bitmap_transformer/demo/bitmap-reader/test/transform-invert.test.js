const assert = require('assert');
const {invert} = require('../lib/transform-invert');

describe('invert', function() {
  it('inverts 8-bit color values', function() {
    const colors = new Buffer([0, 200, 255, 55]);

    invert(colors);

    assert.deepEqual([255, 55, 0, 200], colors);
  });
});
