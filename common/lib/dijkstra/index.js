/**
 * @author Fábio Pereira <fabio.pereira.gti@gmail.com>
 */

import Queue from './utils/queue'
import ObjectToMap from './utils/object-to-map'

class Graph {
  constructor (graph) {
    this.graph = graph || new Map()
  }

  // Add node
  add (name, neighbors) {
    this.graph.set(name, ObjectToMap(neighbors))
    return this
  }

  // Calculate shortest path
  path (start, end) {
    if (!this.graph.size) return null

    const explored = new Set()
    const frontier = new Queue()
    const previous = new Map()

    let path = []
    let totalCost = 0

    // Start point to frontier
    frontier.set(start, 0)

    // Run until we have visited every node
    while (!frontier.isEmpty()) {
      // Get the node in the frontier with the lowest cost/priority
      const node = frontier.next()
      if (node.key === end) {
        totalCost = node.priority
        let nodeKey = node.key

        while (previous.has(nodeKey)) {
          path.push(nodeKey)
          nodeKey = previous.get(nodeKey)
        }

        break
      }

      // Add the current node to the explored set
      explored.add(node.key)

      // Loop all the neighboring nodes
      const neighbors = this.graph.get(node.key) || new Map()
      neighbors.forEach((nCost, nNode) => {
        if (!frontier.has(nNode)) {
          previous.set(nNode, node.key)
          return frontier.set(nNode, node.priority + nCost)
        }

        const frontierPriority = frontier.get(nNode).priority
        const nodeCost = node.priority + nCost

        if (nodeCost < frontierPriority) {
          previous.set(nNode, node.key)
          return frontier.set(nNode, nodeCost)
        }

        return null
      })
    }

    // Return null if path not found
    if (!path.length) {
      return null
    }

    path = path.concat([start])

    return {
      route: path.reverse().join(' - '),
      cost: totalCost
    }
  }
}

export default Graph
