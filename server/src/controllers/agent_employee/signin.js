const generateToken = require('./generateToken')

module.exports = (req, res, next) => {
  const token = generateToken(req.user)
  res.cookie('jwt', token)
  res.send({ token })
}
