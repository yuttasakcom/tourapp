const mongoose = require('mongoose')

const Booking = mongoose.model('Booking')

module.exports = bookingProps =>
  Booking.findOneAndUpdate({ _id: mongoose.Types.ObjectId() }, bookingProps, {
    new: true,
    upsert: true,
    runValidators: true,
    populate: { path: 'agent', select: 'name' }
  })
