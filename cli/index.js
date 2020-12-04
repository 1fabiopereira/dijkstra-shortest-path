/**
 * @author Fábio Pereira <fabio.pereira.gti@gmail.com>
 */

import prompts from 'prompts'
import Dijkstra from '../common/lib/dijkstra'
import LoadCSV from '../common/lib/csv-loader'

const [path] = process.argv.slice(2)

function Init (intro = true) {
  LoadCSV(path).then((data) => {
    (async () => {
      if (intro) console.log('\n📌 - Note: To cancel press CTRL + C \n')

      const response = await prompts({
        type: 'text',
        name: 'value',
        message: 'Please enter the route:'
      }, {
        onCancel: () => {
          console.log('\n👋 - Hasta la vista baby!')
          return true
        }
      })

      const { value } = response

      if (value) {
        const graph = new Dijkstra()
        const [start, end] = value.replace(/ /g, '').split('-')

        // Populate the graph
        let node
        for (node in data) {
          graph.add(`${node}`, data[node])
        }

        const result = graph.path(start, end)

        if (result && result.route && result.cost) {
          console.log(`✅ - best route: ${result.route} > $${result.cost} \n`)
        } else {
          console.log('❌ - Route not found. Check if you types correctly!\n')
        }

        Init(false)
      }
    })()
  }).catch(console.log)
}

Init()
