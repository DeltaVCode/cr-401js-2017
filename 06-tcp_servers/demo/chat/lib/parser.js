'use strict';

//ee.emit('@all', client, message);
//ee.emit('@dm', client, target, message);
//ee.emit('@nickname', client, nickname);

exports.parser = function(line, client, emitCallback) {
  if(line.startsWith('@quit')) {
    return emitCallback('@quit', client, line.substring(6));
  }

  if(line.startsWith('@all ')) {
    return emitCallback('@all', client, line.substring(5));
  }

  if(line.startsWith('@dm ')) {
    let namePlusMessage = line.substring(4).trim();
    let spaceIndex = namePlusMessage.indexOf(' ');

    return emitCallback('@dm', client,
      namePlusMessage.substring(0, spaceIndex),
      namePlusMessage.substring(spaceIndex + 1).trim());
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
