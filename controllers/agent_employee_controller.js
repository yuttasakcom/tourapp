const Booking = require('../models/booking')
const Agent = require('../models/agent')
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
  addBooking(req, res, next) {
    const user = req.user
    let bookingProps = req.body

    Agent.count({
        _id: user.agentId,
        companies: bookingProps.company
      })
      .then(exist => {
        if (!exist) {
          let err = new Error('This company is not member')
          err.status = 401
          return next(err)
        }

        bookingProps.agent = user.agentId
        bookingProps.employee = user._id

        Booking.create(bookingProps)
          .then(booking => {
            res.send(booking)
          })
      })
  },

  signin(req, res, next) {
    res.send({ token: tokenForAgentEmployee(req.user) })
  },

  profile(req, res, next) {
    res.send({ message: 'realy secret' })
  },
}
