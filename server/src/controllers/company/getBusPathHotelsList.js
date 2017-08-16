const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const busPathId = req.params.id
  const hotels = await repo.companyGetBusPathHotelsList(companyId, busPathId)
  return res.send(hotels)
}
