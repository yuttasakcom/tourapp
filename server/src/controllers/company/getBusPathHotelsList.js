const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const busPathId = req.params.id
  const { pkgId } = req.query
  const hotels = await repo.companyGetBusPathHotelsList(
    companyId,
    pkgId,
    busPathId
  )
  return res.send(hotels)
}
