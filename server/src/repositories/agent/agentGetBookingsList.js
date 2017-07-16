const Booking = require('../../models/booking')

module.exports = agentId =>
  Booking.find({ agent: agentId }).populate({
    path: 'company',
    select: 'email name'
  })
