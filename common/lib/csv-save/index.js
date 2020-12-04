/**
 * @author Fábio Pereira <fabio.pereira.gti@gmail.com>
 */
const { createObjectCsvWriter } = require('csv-writer')

function SaveCSV (path, incoming) {
  return new Promise((resolve) => {
    const csvWriter = createObjectCsvWriter({
      path,
      header: [
        { id: 'start', title: 'START' },
        { id: 'end', title: 'END' },
        { id: 'cost', title: 'COST' }
      ]
    })

    csvWriter
      .writeRecords(incoming)
      .then(() => resolve({ status: true }))
      .catch(() => resolve({ status: false }))
  })
}

export default SaveCSV
