const Booking = require('../../models/booking')

exports.book = bookingProps => Booking.create(bookingProps)
