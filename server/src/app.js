const express = require('express')
const { createServer } = require('spdy')
const createIo = require('socket.io')
const socketIoRedis = require('socket.io-redis')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const redis = require('./socket/redis')
const mongoose = require('mongoose')
const router = require('./routes')
const socket = require('./socket')
const ssl = require('./config/ssl')

const {
  handleNotFound,
  handleAnotherError,
  detailLogger
} = require('./middlewares')

mongoose.Promise = global.Promise
redis.flushdb()

const corsOptions = {
  exposedHeaders: ['Content-Range']
}

const app = express()
const server = createServer(ssl, app)
const io = createIo(server)
io.adapter(socketIoRedis({ host: 'localhost', port: 6379 }))

socket(io)

app.use(cors(corsOptions))
app.use(bodyParser.json())

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
  // app.use(detailLogger)
  mongoose.connect('mongodb://localhost/tourapp')
}

router(app)

app.use(handleNotFound)
app.use(handleAnotherError)

module.exports = server
