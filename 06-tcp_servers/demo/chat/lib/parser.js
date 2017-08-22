'use strict';

//ee.emit('@all', client, message);
//ee.emit('@dm', client, target, message);
//ee.emit('@nickname', client, nickname);

exports.parser = function(line, client, emitCallback) {
  emitCallback('@all', client, line);
};
