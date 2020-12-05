/* eslint-disable no-undef */

/**
 * @author Fábio Pereira <fabio.pereira.gti@gmail.com>
 */

import must from 'must'
import ObjectToMap from '../../common/lib/dijkstra/utils/object-to-map'

describe('📌 ObjectToMap', () => {
  it('Transforms a one level object', () => {
    const obj = { example: 1 }
    const map = ObjectToMap(obj)

    map.size.must.equal(1)
    map.get('example').must.equal(1)
  })

  it('Transforms a two level object', () => {
    const obj = { a: { b: 1 } }
    const map = ObjectToMap(obj)

    map.size.must.equal(1)
    map.get('a').must.be.instanceOf(Map)
    map.get('a').get('b').must.equal(1)
  })

  it('Transforms a three level object', () => {
    const obj = { a: { b: { c: 1 } } }
    const map = ObjectToMap(obj)

    map.size.must.equal(1)
    map.get('a').must.be.instanceOf(Map)
    map.get('a').get('b').must.be.instanceOf(Map)
    map.get('a').get('b').get('c').must.equal(1)
  })

  it('Transforms a four level object', () => {
    const obj = { a: { b: { c: { d: 1 } } } }
    const map = ObjectToMap(obj)

    map.size.must.equal(1)
    map.get('a').must.be.instanceOf(Map)
    map.get('a').get('b').get('c').must.be.instanceOf(Map)
    map.get('a').get('b').get('c').get('d').must.equal(1)
  })

  it('Rejects non-number values', () => {
    const obj = { example: null }

    must(ObjectToMap.bind(this, obj))
      .to.throw(Error, /Could not add node/)
  })

  it('Rejects negative values', () => {
    const obj = { example: -3 }

    must(ObjectToMap.bind(this, obj))
      .to.throw(Error, /Could not add node/)
  })

  it('Rejects zero', () => {
    const obj = { example: 0 }

    must(ObjectToMap.bind(this, obj))
      .to.throw(Error, /Could not add node/)
  })

  it('Accepts float numbers', () => {
    const obj = { example: 0.05 }
    const map = ObjectToMap(obj)

    map.size.must.equal(1)
    map.get('example').must.equal(0.05)
  })

  it('Accepts a string that represent a number', () => {
    const obj = { example: '4' }
    const map = ObjectToMap(obj)

    map.size.must.equal(1)
    map.get('example').must.equal(4)
  })
})
