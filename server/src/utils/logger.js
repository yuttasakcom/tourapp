const winston = require('winston')
const moment = require('moment')

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      timestamp: () => moment().format('DD/MM/YYYY hh:mm:ss'),
      prettyPrint: true,
      label: 'tourapp-api'
    })
  ]
})

// create stream for morgan
logger.stream = {
  write: message => logger.info(message)
}

module.exports = logger
