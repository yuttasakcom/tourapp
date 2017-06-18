import app from './app'
import logger from './utils/logger'

const port = process.env.PORT || 4000
app.listen(port, () => {
  logger.info(`API listening on port: ${port}`)
})
