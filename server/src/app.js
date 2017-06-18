import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import mongoose from './models/mongoose'
import router from './routes/routes'
import { handleNotFound, handleAnotherError, detailLogger } from './middlewares'

const corsOptions = {
  exposedHeaders: ['Content-Range']
}

const app = express()

app.use(cors(corsOptions))
app.use(bodyParser.json())

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
  app.use(detailLogger)
  mongoose.connect('mongodb://localhost/tourapp')
}

router(app)

app.use(handleNotFound)
app.use(handleAnotherError)

export default app
