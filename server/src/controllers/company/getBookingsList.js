const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const bookings = await repo.companyGetBookingsList(companyId, req.query.date)
  return res.send(bookings)
}
