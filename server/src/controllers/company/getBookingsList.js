import Booking from '../../models/booking'

export const getBookingsList = (req, res, next) => {
  const companyId = req.user._id

  Booking.find({ company: companyId })
    .populate('agent', 'email')
    .then(bookings => {
      res.send(bookings)
    })
}
