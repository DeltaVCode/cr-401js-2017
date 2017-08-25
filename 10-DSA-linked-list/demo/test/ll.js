const assert = require('assert');

const LL = require('../lib/LinkedList');

describe('LinkedList', function() {
  describe('count', function() {
    it ('should be zero for new list', function() {
      var ll = new LL();

      var count = ll.count();

      assert.equal(count, 0);
      assert.equal(ll.length, 0);
    })
    it ('should be two for list with two things', function() {
      var ll = new LL(17, Math.PI);
      assert.deepEqual(ll.toArray(), [17, Math.PI]);

      var count = ll.count();

      assert.equal(count, 2);
      assert.equal(ll.length, 2);
    })
  })
  describe('prepend', function() {
    it ('should insert value at beginning', function() {
      // Arrange
      var ll = new LL();

      // Act
      ll.prepend(1);
      assert.equal(ll.head.value, 1);
      assert.deepEqual(ll.toArray(), [1]);
      assert.equal(ll.length, 1);

      ll.prepend(2);
      assert.equal(ll.head.value, 2);
      assert.deepEqual(ll.toArray(), [2, 1]);
      assert.equal(ll.length, 2);
    });
  });
  describe('append', function() {
    it('should insert value at end', function() {
      var ll = new LL();

      var first = 7;
      ll.append(first);
      assert.equal(ll.head.value, first);
      assert.deepEqual(ll.toArray(), [first]);
      assert.equal(ll.length, 1);

      var second = '42';
      ll.append(second);
      assert.equal(ll.head.value, first);
      assert.deepEqual(ll.toArray(), [first, second]);
      assert.equal(ll.length, 2);
    })
  })
  describe('insert', function() {
    it('should work at the beginning', function() {
      var ll = new LL();

      ll.insert(0, 15);
      assert.deepEqual(ll.toArray(), [15]);

      ll.insert(0, 75);
      assert.deepEqual(ll.toArray(), [75, 15]);
    });
    it('should work at the end', function() {
      var ll = new LL();

      ll.insert(0, 89);
      ll.insert(1, 42);
      ll.insert(2, 'katz');
      assert.deepEqual(ll.toArray(), [89, 42, 'katz']);
    })
    it('should works in the middle', function() {
      var ll = new LL();

      ll.insert(0, 1);
      assert.deepEqual(ll.toArray(), [1]);
      assert.equal(ll.length, 1);

      ll.insert(1, 2);
      assert.deepEqual(ll.toArray(), [1, 2]);
      assert.equal(ll.length, 2);

      ll.insert(1, 3);
      assert.deepEqual(ll.toArray(), [1, 3, 2]);
      assert.equal(ll.length, 3);

      ll.insert(0, 4);
      assert.deepEqual(ll.toArray(), [4, 1, 3, 2]);
      assert.equal(ll.length, 4);

      ll.insert(1, 5);
      assert.deepEqual(ll.toArray(), [4, 5, 1, 3, 2]);
      assert.equal(ll.length, 5);
    })
  })
});
