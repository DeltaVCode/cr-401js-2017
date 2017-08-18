'use strict';

exports.fb = function(input){
  return [
    [3,'Fizz'],
    [5,'Buzz']
  ].reduce((acc, w) =>
    input % w[0] ?
      acc :
      acc + w[1]
  , '') || input.toString();
}
