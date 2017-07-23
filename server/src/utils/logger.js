const winston = require('winston')

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      timestamp: true,
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
