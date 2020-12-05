/**
 * @author Fábio Pereira <fabio.pereira.gti@gmail.com>
 */

import SaveCSV from '../../common/lib/csv-save'
import LoadCSV from '../../common/lib/csv-loader'

const [path] = process.argv.slice(2)

export default (req, res) => {
  const { start, end, cost } = req.body

  LoadCSV(path).then((data) => {
    const { results } = data
    results.push({ start, end, cost })

    SaveCSV(path, results)
      .then((reply) => res.json({ ...reply }))
      .catch((reply) => res.json({ ...reply }))
  })
}
