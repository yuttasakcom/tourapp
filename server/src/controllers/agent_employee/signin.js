import generateToken from './generateToken'

export default (req, res, next) => {
  res.send({ token: generateToken(req.user) })
}
