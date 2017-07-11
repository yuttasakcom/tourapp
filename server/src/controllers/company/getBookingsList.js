const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const bookings = await repo.companyGetBookingsList(companyId)
  return res.send(bookings)
}
