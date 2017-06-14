import Booking from '../../models/booking'

export const updateBooking = async (req, res, next) => {
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
