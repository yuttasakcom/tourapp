import jwt from 'jwt-simple'
import config from '../../config'

export default agent => {
  const timestamp = new Date().getTime()
  return jwt.encode({
    _id: agent._id,
    sub: agent.email,
    role: 'agent',
    iat: timestamp,
  }, config.secret)
}
