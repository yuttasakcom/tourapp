module.exports = {
  handleNotFound(req, res, next) {
    res.status(404).send("Sorry can't find that!")
  },

  handleAnotherError(err, req, res, next) {
    console.warn(err.message)
    res.status(err.status || 500).send({ error: err.message })
  }
}
