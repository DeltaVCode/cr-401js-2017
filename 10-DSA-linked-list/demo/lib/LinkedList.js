'use strict';

const LinkedList = module.exports = function (...values) {
  this.head = null;
  this.length = values.length;

  values.reduce(
    (prev, v) => prev ?
      prev.next = new Node(v) :
      this.head = new Node(v),
    null);
};

function Node(value) {
  this.value = value;
  this.next = null;
}

LinkedList.prototype.toArray = function() {
  const result = [];

  let node = this.head;
  while (node !== null) {
    result.push(node.value);
    node = node.next;
  }

  /*
  for (let node = this.head; node !== null; node = node.next) {
    result.push(node.value);
  }
  */
  return result;
}

LinkedList.prototype.count = function() {
  var count = 0;
  let node = this.head;
  while (node !== null) {
    count++;
    node = node.next;
  }
  return count;
}

LinkedList.prototype.prepend = function(value) {
  const node = new Node(value);
  node.next = this.head;
  this.head = node;

  this.length += 1;
};

LinkedList.prototype.append = function(value) {
  const newNode = new Node(value);
  newNode.next = null;

  this.length++;

  let node = this.head;
  if (node === null) {
    this.head = newNode;
    return;
  }
  while (node.next !== null) {
    node = node.next;
  }
  node.next = newNode;
}

LinkedList.prototype.insert = function(index, value) {
  if (index === 0)
    return this.prepend(value);

  this.length++;

  let node = this.head;
  for (let i = 1; i < index; i++) {
    node = node.next;
  }
  const newNode = new Node(value);
  newNode.next = node.next;
  node.next = newNode;
}
