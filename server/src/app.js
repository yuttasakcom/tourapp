import express from 'express'

const cors = require('cors')
const logger = require('morgan')
const mongoose = require('./models/mongoose')
const bodyParser = require('body-parser')
const router = require('./routes/routes')
const {
  handleNotFound,
  handleAnotherError,
} = require('./middlewares')

const corsOptions = {
  exposedHeaders: ['Content-Range'],
}

const app = express()

app.use(cors(corsOptions))
app.use(bodyParser.json())

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'))
  mongoose.connect('mongodb://localhost/tourapp')
}

router(app)

app.use(handleNotFound)
app.use(handleAnotherError)

module.exports = app
