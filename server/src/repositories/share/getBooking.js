const Booking = require('../../models/booking')

module.exports = bookingId => Booking.findById(bookingId)
