/* eslint-disable no-undef */

/**
 * @author Fábio Pereira <fabio.pereira.gti@gmail.com>
 */

import must from 'must'
import Dijkstra from '../../common/lib/dijkstra'

describe('📌 Dijkstra', () => {
  describe('Constructor', () => {
    it('Creates an instance of Graph', () => {
      const graph = new Dijkstra()

      must(graph).be.instanceOf(Dijkstra)
      graph.must.be.instanceOf(Dijkstra)
    })

    it('Accepts a Map as graph', () => {
      const graph = new Map()
      const a = new Map()

      a.set('b', 1)
      a.set('c', 2)
      graph.set('a', a)

      const route = new Dijkstra(graph)
      must(route.graph.size).equal(1)
    })

    it('Accepts numbers as key when in a map', () => {
      const graph = new Map()
      const a = new Map()

      a.set(1, 1)
      a.set(2, 2)
      graph.set(1, a)

      const route = new Dijkstra(graph)
      must(route.graph.size).equal(1)
    })
  })

  describe('Add', () => {
    it('Add a node', () => {
      const graph = new Dijkstra()
      graph.add('a', { b: 10, c: 20 })

      const node = graph.graph.get('a')

      must(node).be.instanceOf(Map)
      must(node.get('b')).equal(10)
      must(node.get('c')).equal(20)
    })

    it('Returns the Graph object', () => {
      const graph = new Dijkstra()
      must(graph.add('a', { b: 10, c: 20 })).be.instanceOf(Dijkstra)
    })
  })

  describe('Path', () => {
    const vertices = {
      a: { b: 20, c: 80 },
      b: { a: 20, c: 20 },
      c: { a: 80, b: 20 }
    }

    it('Returns the shortest path', () => {
      const graph = new Dijkstra()
      graph.add('a', vertices.a)
      graph.add('b', vertices.b)
      graph.add('c', vertices.c)

      const path = graph.path('a', 'c')
      must(path.route).be.equal('a - b - c')
    })

    it('Returns cost of shortest path', () => {
      const graph = new Dijkstra()
      graph.add('a', vertices.a)
      graph.add('b', vertices.b)
      graph.add('c', vertices.c)

      const path = graph.path('a', 'c')
      must(path.route).be.equal('a - b - c')
      must(path.cost).be.equal(40)
    })

    it('Returns null when no path is found', () => {
      const graph = new Dijkstra()
      graph.add('a', vertices.a)
      graph.add('b', vertices.b)
      graph.add('c', vertices.c)

      const path = graph.path('a', 'd')
      must(path).be.null()
    })

    it('returns null when no vertices are defined', () => {
      const graph = new Dijkstra()
      const path = graph.path('a', 'd')
      must(path).be.null()
    })
  })
})
