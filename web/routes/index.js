/**
 * @author Fábio Pereira <fabio.pereira.gti@gmail.com>
 */
import express from 'express'
import Best from '../handlers/best-route'
import Add from '../handlers/add'

const router = express.Router()
router.get('/', Best)
router.post('/add', Add)

export default router
