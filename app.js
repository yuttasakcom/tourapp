const app = require('express')()
const cors = require('cors')
const logger = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./routes/routes')

mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'))
}

router(app)

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send({ error: err.message })
})

module.exports = app
