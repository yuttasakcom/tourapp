import Agent from '../../models/agent'
import Booking from '../../models/booking'

export const addBooking = (req, res, next) => {
  const user = req.user
  const bookingProps = req.body

  Agent.count({
    _id: user._id,
    companies: bookingProps.company
  }).then(exist => {
    if (!exist) {
      const err = new Error('This company is not member')
      err.status = 401
      return next(err)
    }

    bookingProps.agent = user._id

    return Booking.create(bookingProps).then(booking => {
      res.send(booking)
    })
  })
}
