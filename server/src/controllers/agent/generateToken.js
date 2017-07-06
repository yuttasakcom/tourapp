const jwt = require('jwt-simple')
const config = require('../../config')

module.exports = agent => {
  const timestamp = new Date().getTime()
  return jwt.encode(
    {
      _id: agent._id,
      sub: agent.email,
      role: 'agent',
      iat: timestamp
    },
    config.secret
  )
}
