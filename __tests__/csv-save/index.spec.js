/* eslint-disable node/no-path-concat */
/* eslint-disable no-undef */

/**
 * @author Fábio Pereira <fabio.pereira.gti@gmail.com>
 */

import must from 'must'
import SaveCSV from '../../common/lib/csv-save'

describe('📌 SaveCSV', () => {
  const path = `${__dirname}/../assets/routes-to-save.csv`

  it('Successfully save file', async () => {
    const data = [
      { start: 'GRU', end: 'BRC', cost: 10 },
      { start: 'BRC', end: 'SCL', cost: 5 },
      { start: 'GRU', end: 'CDG', cost: 75 },
      { start: 'GRU', end: 'SCL', cost: 20 },
      { start: 'GRU', end: 'ORL', cost: 56 },
      { start: 'ORL', end: 'CDG', cost: 5 },
      { start: 'SCL', end: 'ORL', cost: 20 }
    ]

    const response = await SaveCSV(path, data)

    response.must.be.object()
    must(response.status).be.eql(true)
  })

  it('The data provided is empty', async () => {
    try {
      const data = []
      await SaveCSV(path, data)
    } catch (error) {
      const { message } = error
      must(message).to.be.equal('The data provided is incorrect.')
    }
  })

  it('The data provided have wrong format', async () => {
    try {
      const data = [{ start: 'GRU', end: null, cost: 10 }]
      await SaveCSV(path, data)
    } catch (error) {
      const { message } = error
      must(message).to.be.equal('The data provided is incorrect.')
    }
  })

  it('Path have wrong extension', async () => {
    try {
      const data = [{ start: 'GRU', end: 'BRC', cost: 10 }]
      await SaveCSV(path, data)
    } catch (error) {
      const { message } = error
      must(message).to.be.equal('File extension is wrong.')
    }
  })
})
