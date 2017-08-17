'use strict';

function FakeArray() {
  for(let i = 0; i < arguments.length; i++) {
    this[i] = arguments[i];
  }

  this.length = arguments.length;
}

FakeArray.prototype.push = function(element) {
  this[this.length++] = element;
}

FakeArray.prototype.map = function(selector) {
  var result = new FakeArray();
  for (let i = 0; i < this.length; i++) {
    result.push(selector(this[i]));
  }
  return result;
}

var f = new FakeArray(1,2,3);
f.push(4)
console.log(f);

console.log(f.map(x => x * 2));

var realArray = [3,6,9];
console.log(realArray);

// https://stackoverflow.com/a/32548260
var fakeArray = new FakeArray(...realArray);
console.log(fakeArray);

var fakeMap = FakeArray.prototype.map.call(realArray, x => x - 3);
console.log(fakeMap);


Buffer.prototype.map = function(selector) {
  return new Buffer(Array.prototype.map.call(this, selector));
}

function bufferMap(buffer, selector) {
  return new Buffer(Array.prototype.map.call(buffer, selector));
}

var buf = new Buffer([0x00, 0x5a, 0xa5, 0xff]);
console.log(buf);
console.log(buf.map(x => ~x));
console.log(bufferMap(buf, x => ~x));
