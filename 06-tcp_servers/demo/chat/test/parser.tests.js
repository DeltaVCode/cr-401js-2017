const assert = require('assert');
const { parser } = require('../lib/parser');
const EventEmitter = require('events');

// parser(line, emitCallback);

describe('parser', function() {
  const client = {};

  function testParser(line, expectedCommand, ...expectedArgs) {
    parser(line, client, (e, c, ...actualArgs) => {
      assert.equal(e, expectedCommand, "Command is wrong");
      assert.equal(c, client, "How did you mess this up?");
      assert.deepEqual(actualArgs, expectedArgs, "Emitted arguments don't match.");
    });
  }

  it('should emit @all with message', function() {
    testParser(
      '@all hello',
      '@all', 'hello');
  });

  it('should emit @nickname with new name', function(done) {
    parser('@nickname justin', client,
      (e, c, n) => {
        assert.equal(e, '@nickname');
        assert.equal(c, client);
        assert.equal(n, 'justin');

        done();
      });
  });

  it('should emit @nickname with new trimmed name', function(done) {
    parser('@nickname   justin    ', client,
      (e, c, n) => {
        assert.equal(e, '@nickname');
        assert.equal(c, client);
        assert.equal(n, 'justin');

        done();
      });
  });

  it('should emit help if @nickname has a space', function(done) {
    parser('@nickname justin timberlake', client,
      (e, c, m) => {
        assert.equal(e, 'help');
        assert.equal(c, client);
        assert.equal(m, 'Invalid nickname: justin timberlake');

        done();
      });
  });

  it('should emit help given invalid command', function(done) {
    parser('oops', client,
      (e, c, m) => {
        assert.equal(e, 'help');
        assert.equal(c, client);
        assert.equal(m, `I don't know how to 'oops'.`)

        done();
      });
  });
})
