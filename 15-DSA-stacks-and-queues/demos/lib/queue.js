'use strict'

const Queue = module.exports = require('./linked_list')

Queue.prototype.tail = null

Queue.prototype.enqueue = function(value) {
  this.insert(value)
  if(!this.head.next) this.tail = this.head
  return this
}

Queue.prototype.dequeue = function() {
  this.secondToLast = null

  let _getSecondToLast = (node) => {
    if(!node.next) return
    this.secondToLast = node
    _getSecondToLast(node.next)
  }

  _getSecondToLast(this.head)
  this.secondToLast.next = null
  this.tail = this.secondToLast
  return this
}
