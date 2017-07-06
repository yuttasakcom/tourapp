const Booking = require('../../models/booking')

module.exports = async (req, res, next) => {
  const bookingId = req.params.id
  const bookingProps = req.body

  await Booking.update(
    { _id: bookingId },
    {
      $set: bookingProps
    }
  )
  return res.send({ message: 'Update booking completed' })
}
