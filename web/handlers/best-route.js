/**
 * @author Fábio Pereira <fabio.pereira.gti@gmail.com>
 */

import Dijkstra from '../../common/lib/dijkstra'
import LoadCSV from '../../common/lib/csv-loader'

const [path] = process.argv.slice(2)

export default (req, res) => {
  const { route } = req.query
  LoadCSV(path).then((data) => {
    const graph = new Dijkstra()
    const [start, end] = route.replace(/ /g, '').split('-')

    const { map } = data

    // Populate the graph
    let node
    for (node in map) {
      graph.add(`${node}`, map[node])
    }

    const result = graph.path(start, end)

    if (result && result.route && result.cost) {
      res.json({ ...result })
    } else {
      res.json({ error: 'Route not found' })
    }
  })
}
