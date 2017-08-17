const oldTrim = String.prototype.trim;

function trim() {
  console.log(`Pre-trim: '${this}'`);
  return oldTrim.call(this);
}
String.prototype.trim = trim;

function argsToArray(args) {
  return Array.prototype.slice.call(args);
}

function test(one, two) {
  console.log(one);
  console.log(two.trim());
  console.log(arguments.length);
  console.log(arguments);

  let arr = argsToArray(arguments);
  console.log(arr);
  arr.forEach(a => console.log(a));
}

test(1, '  two  ', 3);
