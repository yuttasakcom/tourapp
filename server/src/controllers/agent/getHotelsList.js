const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const hotels = await repo.getHotelsList()
  return res.send(hotels)
}
