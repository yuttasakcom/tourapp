const winston = require('winston')
const expressWinston = require('express-winston')

const logger = require('../utils/logger')

exports.handleNotFound = (req, res, next) => {
  res.status(404).send("Sorry can't find that!")
}

exports.handleAnotherError = (err, req, res, next) => {
  logger.warn(err.message)
  res.status(err.status || 500).send({ error: err.message })
}

exports.hasRole = role => (req, res, next) => {
  if (role === req.user.role) {
    return next()
  }
  const err = new Error('Unauthorized')
  err.status = 401
  return next(err)
}

exports.detailLogger = expressWinston.logger({
  requestWhitelist: ['body'],
  responseWhitelist: ['body'],
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ]
})
