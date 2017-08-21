const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const { pkgId, dateStart, dateEnd } = req.query
  const bookingsHotelsSummary = await repo.companyGetBookingsHotelsSummary(
    companyId,
    pkgId,
    dateStart,
    dateEnd
  )
  return res.send(
    bookingsHotelsSummary.map(hotel => ({
      _id: hotel._id._id,
      name: hotel._id.name,
      total: hotel.total
    }))
  )
}
