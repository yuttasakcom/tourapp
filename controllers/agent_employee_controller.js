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
  addBooking(req, res, next) {
    const user = req.user

    let bookingProps = req.body
    bookingProps.agentId = user.agentId
    bookingProps.employeeId = user._id

    Booking.create(bookingProps)
      .then(booking => {
        res.send(booking)
      })
  },

  signin(req, res, next) {
    res.send({ token: tokenForAgentEmployee(req.user) })
  },

  profile(req, res, next) {
    res.send({ message: 'realy secret' })
  },
}
