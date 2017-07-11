const Booking = require('../../models/booking')

module.exports = bookingProps => Booking.create(bookingProps)
