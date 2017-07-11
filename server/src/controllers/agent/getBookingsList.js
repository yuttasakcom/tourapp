const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const agentId = req.user._id
  const bookings = await repo.agentGetBookingsList(agentId)
  return res.send(bookings)
}
