import jwt from 'jwt-simple'
import config from '../../config'

export default agent => {
  const timestamp = new Date().getTime()
  const employee = agent.employees[0]

  return jwt.encode({
    _id: employee._id,
    agentId: agent._id,
    sub: employee.email,
    role: 'agentEmployee',
    iat: timestamp,
  }, config.secret)
}
