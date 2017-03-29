import logger from '../utils/logger'

export const handleNotFound = (req, res, next) => {
  res.status(404).send("Sorry can't find that!")
}

export const handleAnotherError = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    err.status = 422
  }
  logger.warn(err.message)
  res.status(err.status || 500).send({ error: err.message })
}

export const hasRole = role => (req, res, next) => {
  if (role === req.user.role) {
    return next()
  }
  const err = new Error('Unauthorized')
  err.status = 401
  return next(err)
}
