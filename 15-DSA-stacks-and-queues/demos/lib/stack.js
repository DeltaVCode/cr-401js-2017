'use strict'

const Stack = module.exports = require('./linked_list')

Stack.prototype.push = function(value) {
  this.insert(value)
  return this
}

Stack.prototype.pop = function() {
  this.shift()
  return this
}

Stack.prototype.peek = function() {
  return this.head.val
}
