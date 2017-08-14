const circle = require('./circle.js');
const { circumference } = circle;

const { area } = require('./circle.js');

function unitCircleArea() {
  return area(1);
}

function unitCircleCircumfrence() {
  return circle.circumference(1);
}

function sayHello() {
  console.log('hello');
}

exports.unitCircleCircumfrence = unitCircleCircumfrence;
exports.unitCircleArea = unitCircleArea;
exports.sayHello = sayHello;
