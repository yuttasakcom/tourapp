const Booking = require('mongoose').model('Booking')

module.exports = bookingId =>
  Booking.findById(bookingId).populate(
    'agent',
    'email name phoneNumber address adminName adminPhoneNumber'
  )
