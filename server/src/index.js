const app = require('./app')
const morgan = require('morgan')
const logger = require('./utils/logger')

app.use(morgan('dev'))

const port = process.env.PORT || 4000
app.listen(port, () => {
  logger.info(`API listening on port: ${port}`)
})
