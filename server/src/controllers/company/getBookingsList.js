const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const bookings = await repo.companyGetBookingsList(
    companyId,
    req.query.dateStart,
    req.query.dateEnd
  )
  return res.send(bookings)
}
