import express from 'express'
import { createServer } from 'http'
import createIo from 'socket.io'
import redis from 'socket.io-redis'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import mongoose from './models/mongoose'
import router from './routes'
import socket from './socket'
import { handleNotFound, handleAnotherError, detailLogger } from './middlewares'

const corsOptions = {
  exposedHeaders: ['Content-Range']
}

const app = express()
const server = createServer(app)
const io = createIo(server)
io.adapter(redis({ host: 'localhost', port: 6379 }))

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

export default server
