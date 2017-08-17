'use strict';

function Person(obj, second) {
  if (!this) return;

  second && console.log(second);

  this.happy = true;
  this.andKnowsIt = true;

  Object.keys(obj).forEach(k => this[k] = obj[k]);
}
Person.prototype.introduce = function() {
  console.log(`My name is ${this.name}`);
}

const dustin = new Person({
  name: 'Dustin',
  age: 21
});

console.log(dustin);
dustin.introduce();

const broken = Person({ name: 'broken?' });
console.log(broken);

const apple = { func: 'apply' };
Person.apply(apple, [{ name: 'Apple' }, 'second']);
console.log(apple);
// apple.introduce(); // Fails - prototype not Person

const banana = { func: 'call' };
Person.call(banana, { name: 'Banana' }, 'second');
console.log(banana);

const pear = { func: 'bind' };
const pearPerson = Person.bind(pear);
console.log(Person);
console.log(pearPerson);
pearPerson({ name: 'Pear' });
console.log(pear);
