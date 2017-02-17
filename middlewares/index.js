module.exports = {
  handleNotFound(req, res, next) {
    res.status(404).send("Sorry can't find that!")
  },

  handleAnotherError(err, req, res, next) {
    console.warn(err.message)
    res.status(err.status || 500).send({ error: err.message })
  },

  hasRole(role) {
    return (req, res, next) => {
      if (role === req.user.role) {
        return next()
      } else {
        let err = new Error('Unauthorized')
        err.status = 401
        return next(err)
      }
    }
  }
}
