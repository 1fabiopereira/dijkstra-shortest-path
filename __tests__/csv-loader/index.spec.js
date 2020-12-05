/* eslint-disable node/no-path-concat */
/* eslint-disable no-undef */

/**
 * @author Fábio Pereira <fabio.pereira.gti@gmail.com>
 */

import must from 'must'
import LoadCSV from '../../common/lib/csv-loader'

describe('📌 LoadCSV', () => {
  it('Successfully loaded file', async () => {
    const path = `${__dirname}/../assets/routes-to-load.csv`
    const { map, results } = await LoadCSV(path)

    map.must.be.object()
    results.must.not.be.empty()
  })

  it('File not exist or Path is wrong', async () => {
    try {
      const path = 'file.csv'
      await LoadCSV(path)
    } catch (error) {
      const { message } = error
      must(message).to.be.equal("File doesn't exists.")
    }
  })

  it('File format wrong', async () => {
    try {
      const path = 'file.json'
      await LoadCSV(path)
    } catch (error) {
      const { message } = error
      must(message).to.be.equal('File format wrong.')
    }
  })
})
