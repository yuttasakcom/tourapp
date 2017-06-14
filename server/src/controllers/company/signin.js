import generateToken from './generateToken'

export const signin = (req, res, next) =>
  res.send({ token: generateToken(req.user) })
