'use strict';

function Stack(){
  this.length = 0;
}

Stack.prototype.push = function(value){
  this[this.length++] = value;
  return this;
};

Stack.prototype.pop = function(){
  if (this.length === 0) return;
  var result = this[--this.length]; 
  delete this[this.length];
  return result;
};

let numStack = new Stack();
console.log('numStack', numStack);
console.log('numStack.push(33)', numStack.push(33));
console.log('numStack.push(100)', numStack.push(100));
console.log('numStac.pop()', numStack.pop());
console.log('numStack', numStack);
console.log('numStac.pop()', numStack.pop());
console.log('numStack', numStack);
console.log('numStac.pop()', numStack.pop());
console.log('numStack', numStack);
