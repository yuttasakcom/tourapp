const Booking = require('../../models/booking')

module.exports = companyId =>
  Booking.find({ company: companyId }).populate('agent', 'email')
