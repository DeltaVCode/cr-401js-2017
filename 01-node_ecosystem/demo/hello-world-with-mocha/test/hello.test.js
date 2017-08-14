const assert = require('assert');
const hello = require('../lib/hello');

describe('hello', function() {
  describe('#unitCircleCircumfrence()', function() {
    it('should return 2*pi', () => {
      assert.strictEqual(hello.unitCircleCircumfrence(), Math.PI * 2);
    });
  })

  describe('#unitCircleArea()', function() {
    it('should return pi', () => {
      assert.equal(hello.unitCircleArea(), Math.PI);
      assert.strictEqual(hello.unitCircleArea(), Math.PI);
    })
  })

  describe('#greet()', function() {
    it('should return null without name', () => {
      assert.strictEqual(hello.greet(), null);
    })

    it('should return "hello <name>" with name', () => {
      assert.strictEqual(hello.greet('class'), "hello class");
    })

    it(`should return "hello" if name is empty`, () => {
      assert.strictEqual(hello.greet(''), "hello");
    })
  })
});
