const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const bookingsHotelsSummary = await repo.companyGetBookingsHotelsSummary(
    companyId,
    req.query.dateStart,
    req.query.dateEnd
  )
  return res.send(bookingsHotelsSummary)
}
