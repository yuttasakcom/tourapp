const Booking = require('../../models/booking')

module.exports = async (req, res, next) => {
  const companyId = req.user._id

  const bookings = await Booking.find({ company: companyId }).populate(
    'agent',
    'email'
  )
  return res.send(bookings)
}
