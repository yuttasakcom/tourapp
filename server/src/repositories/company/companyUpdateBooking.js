const Booking = require('../../models/booking')

module.exports = (bookingId, bookingProps) =>
  Booking.findOneAndUpdate(
    { _id: bookingId },
    {
      $set: bookingProps
    }
  ).populate('company', 'name')
