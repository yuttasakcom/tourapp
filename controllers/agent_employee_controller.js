module.exports = {
  signin(req, res, next) {
    res.send({ token: 'wtf' })
  },

  profile(req, res, next) {
    res.send({ message: 'realy secret' })
  },
}
