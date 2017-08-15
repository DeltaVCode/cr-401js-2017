const assert = require('assert');

const sut = require('../lib/fs-demo');

describe('fs-demo', function() {
  describe('#readData()', function() {
    it ('should find 01.txt data', function(done) {
      sut.readData('01.txt', (err, data) => {
        assert.ifError(err);

        assert.equal(data.length, 5);
        assert.equal(data.toString(), 'uno\r\n');

        done();
      })
      console.log('01 test is done');
    })
  })

  describe('#readTwo()', function() {
    it ('should concat data from two files', function (done) {
      sut.readTwo('01.txt', '02.txt', (err, res) => {
        assert.ifError(err);
        assert.equal(res, 'uno\r\ndos\r\n');

        done();
      })
    })
    it ('should call callback with err given bad file1', function (done) {
      sut.readTwo('00.txt', '02.txt', (err, res) => {
        assert.notStrictEqual(err, null);
        assert.strictEqual(res, undefined);

        done();
      })
    })
    it ('should call callback with err given bad file2', function (done) {
      sut.readTwo('01.txt', '00.txt', (err, res) => {
        assert.notStrictEqual(err, null);
        assert.strictEqual(res, undefined);

        done();
      })
    })
  })
})
