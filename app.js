import Dijkstra from './src/lib/dijkstra'
const graph = new Dijkstra()

graph
  .add('GRU', { BRC: 10, CDG: 75, SLC: 20, ORL: 56 })
  .add('BRC', { SCL: 5 })
  .add('ORL', { CDG: 5 })
  .add('SCL', { ORL: 20 })

console.log('best route: ', graph.path('GRU', 'CDG'))
console.log('best route: ', graph.path('GRU', 'SLC'))
