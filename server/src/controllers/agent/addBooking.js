import Agent from '../../models/agent'
import Booking from '../../models/booking'

export const addBooking = async (req, res, next) => {
  const user = req.user
  const bookingProps = req.body

  const exist = await Agent.count({
    _id: user._id,
    companies: bookingProps.company
  })

  if (!exist) {
    const err = new Error('This company is not member')
    err.status = 401
    return next(err)
  }

  bookingProps.agent = user._id
  const booking = await Booking.create(bookingProps)
  return res.send(booking)
}
