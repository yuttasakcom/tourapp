const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const bookingsSummary = await repo.companyGetBookingsSummary(
    companyId,
    req.query.dateStart,
    req.query.dateEnd
  )
  return res.send(bookingsSummary)
}
