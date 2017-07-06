const generateToken = require('./generateToken')

module.exports = (req, res, next) =>
  res.send({ token: generateToken(req.user) })
