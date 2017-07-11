const Booking = require('../../models/booking')

module.exports = agentId =>
  Booking.find({ agent: agentId }).populate('company', 'email')
