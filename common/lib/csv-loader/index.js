/**
 * @author Fábio Pereira <fabio.pereira.gti@gmail.com>
 */
import csv from 'csv-parser'
import fs from 'fs'

function LoadCSV (path) {
  const results = []

  return new Promise((resolve, reject) => {
    try {
      if (((path.split('/').pop()).split('.')).pop() !== 'csv') {
        throw new Error('File format wrong.')
      }

      if (!fs.existsSync(path)) {
        throw new Error('File doesn\'t exists.')
      }

      fs.createReadStream(path)
        .pipe(csv(['start', 'end', 'cost']))
        .on('data', (data) => {
          if (data.start !== 'START' && data.end !== 'END' && data.cost !== 'COST') {
            return results.push({ ...data, cost: Number(data.cost) })
          }
        })
        .on('error', reject)
        .on('end', () => {
          const map = {}

          results.forEach(item => {
            map[item.start] = map[item.start]
              ? { ...map[item.start], [item.end]: item.cost }
              : { [item.end]: item.cost }
          })

          resolve({ map, results })
        })
    } catch (err) {
      reject(err)
    }
  })
}

export default LoadCSV
