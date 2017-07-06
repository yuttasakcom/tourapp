const Booking = require('../../models/booking')

module.exports = async (req, res, next) => {
  const agentId = req.user._id

  const bookings = await Booking.find({ agent: agentId }).populate(
    'company',
    'email'
  )
  return res.send(bookings)
}
