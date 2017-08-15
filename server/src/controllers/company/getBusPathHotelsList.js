const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const hotels = await repo.companyGetBusPathHotelsList(companyId)
  return res.send(hotels)
}
