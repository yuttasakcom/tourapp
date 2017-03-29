const app = require('./app')
const logger = require('morgan')
const log = require('./utils/logger')

app.use(logger('dev'))

const port = process.env.PORT || 4000
app.listen(port, () => {
  log.info('API listening on port:', port)
})
