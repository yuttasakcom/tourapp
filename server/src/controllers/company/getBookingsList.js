import Booking from '../../models/booking'

export const getBookingsList = async (req, res, next) => {
  const companyId = req.user._id

  const bookings = await Booking.find({ company: companyId }).populate(
    'agent',
    'email'
  )
  return res.send(bookings)
}
