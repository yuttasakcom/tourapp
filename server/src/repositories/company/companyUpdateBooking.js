const Booking = require('mongoose').model('Booking')

module.exports = (bookingId, bookingProps) =>
  Booking.findOneAndUpdate(
    { _id: bookingId },
    {
      $set: bookingProps
    }
  ).populate('company', 'name')
