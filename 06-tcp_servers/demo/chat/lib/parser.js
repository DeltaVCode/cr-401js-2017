'use strict';

//ee.emit('@all', client, message);
//ee.emit('@dm', client, target, message);
//ee.emit('@nickname', client, nickname);

exports.parser = function(line, client, emitCallback) {
  if(line.startsWith('@all ')) {
    return emitCallback('@all', client, line.substring(5));
  }
  if(line.startsWith('@nickname ')) {
    let name = line.substring(10).trim();
    if (name.indexOf(' ') >= 0) {
      return emitCallback('help', client, `Invalid nickname: ${name}`);
    }
    return emitCallback('@nickname', client, name);
  }
  emitCallback('help', client, `I don't know how to '${line}'.`);
};
