/* eslint-disable no-undef */

/**
 * @author Fábio Pereira <fabio.pereira.gti@gmail.com>
 */

import must from 'must'
import sinon from 'sinon'
import Queue from '../../common/lib/dijkstra/utils/queue'

describe('📌  Queue', () => {
  describe('Constructor', () => {
    it('Starts an empty queue', () => {
      const queue = new Queue()

      queue.keys.must.be.instanceOf(Set)
      queue.queue.must.be.an.array()
    })
  })

  describe('Sort', () => {
    it('Sorts by having the smallest first', () => {
      const queue = new Queue()
      queue.queue = [{ priority: 10 }, { priority: 1 }]

      queue.sort()
      queue.queue[0].priority.must.equal(1)
    })
  })

  describe('Set', () => {
    it('Only accept numbers', () => {
      const queue = new Queue()

      must(queue.set.bind(queue, 'key', {}))
        .throw(TypeError, /number/)
    })

    it('Adds an nonexistent key', () => {
      const queue = new Queue()
      sinon.spy(queue, 'sort')

      queue.set('ok', 1)

      sinon.assert.calledOnce(queue.sort)
      queue.keys.size.must.equal(1)
      queue.queue.must.have.length(1)
      queue.queue[0].key.must.equal('ok')
      queue.queue[0].priority.must.equal(1)
    })

    it('Updates the value of an existing key', () => {
      const queue = new Queue()
      sinon.spy(queue, 'sort')

      queue.set('ok', 1)
      queue.set('ok', 5)

      sinon.assert.calledTwice(queue.sort)
      queue.keys.size.must.equal(1)
      queue.queue.must.have.length(1)
      queue.queue[0].key.must.equal('ok')
      queue.queue[0].priority.must.equal(5)
    })
  })

  describe('Next', () => {
    it('Removes the first element', () => {
      const queue = new Queue()
      queue.set('ok', 10)
      queue.set('not-ok', 1)

      queue.next()

      queue.queue.must.have.length(1)
      queue.keys.size.must.equal(1)
    })

    it('Return the first element', () => {
      const queue = new Queue()
      queue.set('ok', 10)
      queue.set('not-ok', 1)

      const el = queue.next()

      el.must.have.keys(['priority', 'key'])
      el.priority.must.equal(1)
      el.key.must.equal('not-ok')
    })
  })

  describe('IsEmpty', () => {
    it('Returns false when there are elements', () => {
      const queue = new Queue()
      queue.set('ok', 3)

      queue.isEmpty().must.be.false()
    })

    it('Returns true when the queue is empty', () => {
      const queue = new Queue()

      queue.isEmpty().must.be.true()
    })
  })

  describe('Has', () => {
    it('Returns false when the key does not exist', () => {
      const queue = new Queue()
      queue.set('not-ok', 3)

      queue.has('ok').must.be.false()
    })

    it('Returns false when the key does not exist', () => {
      const queue = new Queue()
      queue.set('not-ok', 3)

      queue.has('ok').must.be.false()
    })
  })

  describe('Get', () => {
    it('gets the entry with the provided key', () => {
      const queue = new Queue()
      queue.set('ok', 3)

      const res = queue.get('ok')
      res.must.have.keys(['key', 'priority'])
      res.key.must.equal('ok')
      res.priority.must.equal(3)
    })
  })
})
