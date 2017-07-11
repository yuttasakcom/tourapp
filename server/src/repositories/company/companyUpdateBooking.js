const Booking = require('../../models/booking')

module.exports = (bookingId, bookingProps) =>
  Booking.update(
    { _id: bookingId },
    {
      $set: bookingProps
    }
  )
