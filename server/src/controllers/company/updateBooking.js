import Booking from '../../models/booking'

export default (req, res, next) => {
  const bookingId = req.params.id
  const bookingProps = req.body

  Booking
    .update({ _id: bookingId }, {
      $set: bookingProps,
    })
    .then(() => {
      res.send({ message: 'Update booking completed' })
    })
}