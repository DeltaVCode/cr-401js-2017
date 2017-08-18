const { fb } = require('./lib/fb');

function doFizzBuzz(start, stop) {
  var result = [];

  for (var i = start; i <= stop; i++) {
    result.push(fb(i));
  }

  return result;
}


var start = 1;
var stop = 100;
console.log(doFizzBuzz(start, stop));
