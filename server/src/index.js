import morgan from 'morgan'
import app from './app'
import logger from './utils/logger'

app.use(morgan('dev'))

const port = process.env.PORT || 4000
app.listen(port, () => {
  logger.info(`API listening on port: ${port}`)
})
