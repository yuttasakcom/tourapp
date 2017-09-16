const express = require('express')
const { createServer } =
  process.env.NODE_ENV === 'development' ? require('http') : require('spdy')
const createIo = require('socket.io')
const socketIoRedis = require('socket.io-redis')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('./utils/logger')

require('./models/agent')
require('./models/booking')
require('./models/busPath')
require('./models/company')
require('./models/hotel')
require('./models/pkg')
require('./services/passport')
const redis = require('./socket/redis')
const mongoose = require('mongoose')
const router = require('./routes')
const socket = require('./socket')
const ssl = require('./config/ssl')
const keys = require('./config/keys')
const { MONGO_DB_HOST, REDIS_HOST } = require('./config')

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
const server =
  process.env.NODE_ENV === 'development'
    ? createServer(app)
    : createServer(ssl, app)
const io = createIo(server)
io.adapter(socketIoRedis({ host: REDIS_HOST, port: 6379 }))

socket(io)

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(cookieParser())

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
  app.use(detailLogger)
  mongoose
    .connect(`mongodb://${MONGO_DB_HOST}/tourapp`, {
      useMongoClient: true
    })
    .catch(err => {
      logger.error('App starting error:', err.stack)
      process.exit(1)
    })
}

router(app)

app.use(handleNotFound)
app.use(handleAnotherError)

module.exports = server
