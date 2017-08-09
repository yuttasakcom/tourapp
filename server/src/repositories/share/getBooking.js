const Booking = require('../../models/booking')

module.exports = bookingId =>
  Booking.findById(bookingId).populate(
    'agent',
    'email name phoneNumber address'
  )
