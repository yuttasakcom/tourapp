const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const bookingId = req.params.id
  const bookingProps = req.body
  const booking = await repo.companyUpdateBooking(bookingId, bookingProps)
  return res.send(booking)
}
