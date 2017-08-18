const assert = require('assert');
const { fb } = require('../lib/fb');

describe("Normal FizzBuzz", function() {
  it("should return '1' given 1", function() {
    // Arrange
    var input = 1;

    // Act
    var result = fb(input);

    // Assert
    assert.equal(typeof result, 'string');
    assert.strictEqual(result, '1');
  })

  it("should return 'Fizz' given multiples of 3", function() {
    // Arrange
    var input = 3;

    // Act
    var result = fb(input);

    // Assert
    assert.strictEqual(result, 'Fizz');

    assert.strictEqual(fb(6), 'Fizz');
    assert.strictEqual(fb(9), 'Fizz');
  })

  it("should return 'Buzz' given multiples of 5", function() {
    assert.strictEqual(fb(5), 'Buzz');
    assert.strictEqual(fb(10), 'Buzz');
    assert.strictEqual(fb(20), 'Buzz');
  })

  it("should return 'FizzBuzz' given multiples of 15", function() {
    assert.strictEqual(fb(15), 'FizzBuzz');
    assert.strictEqual(fb(30), 'FizzBuzz');
    assert.strictEqual(fb(45), 'FizzBuzz');
  })
});
