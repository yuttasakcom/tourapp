const Booking = require('../models/booking')
const jwt = require('jwt-simple')
const config = require('../config')

const tokenForAgentEmployee = (agent) => {
  const timestamp = new Date().getTime()
  const employee = agent.employees[0]

  return jwt.encode({
    _id: employee._id,
    agentId: agent._id,
    sub: employee.email,
    role: 'agentEmployee',
    iat: timestamp
  }, config.secret)
}

module.exports = {
  signin(req, res, next) {
    res.send({ token: tokenForAgentEmployee(req.user) })
  },

  profile(req, res, next) {
    res.send({ message: 'realy secret' })
  },
}
