import jwt from 'jwt-simple'
import config from '../../config'

export default company => {
  const timestamp = new Date().getTime()
  return jwt.encode({
    _id: company._id,
    sub: company.email,
    role: 'company',
    iat: timestamp,
  }, config.secret)
}
