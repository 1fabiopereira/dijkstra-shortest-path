import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import routes from './routes'

const app = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(routes)

app.listen(process.env.PORT || 3000, () => console.log(`Application started at port ${process.env.PORT || 3000}`))
