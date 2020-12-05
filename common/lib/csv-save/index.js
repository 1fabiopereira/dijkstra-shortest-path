/**
 * @author Fábio Pereira <fabio.pereira.gti@gmail.com>
 */

const { createObjectCsvWriter } = require('csv-writer')

function SaveCSV (path, data) {
  return new Promise((resolve, reject) => {
    try {
      if (((path.split('/').pop()).split('.')).pop() !== 'csv') {
        throw new Error('File extension is wrong.')
      }

      if (!data || !Array.isArray(data) || !data.length || !data[0].start || !data[0].end || !data[0].cost) {
        throw new Error('The data provided is incorrect.')
      }

      createObjectCsvWriter({
        path,
        header: [
          { id: 'start', title: 'START' },
          { id: 'end', title: 'END' },
          { id: 'cost', title: 'COST' }
        ]
      })
        .writeRecords(data)
        .then(() => resolve({ status: true }))
        .catch((err) => reject(err))
    } catch (error) {
      reject(error)
    }
  })
}

export default SaveCSV
