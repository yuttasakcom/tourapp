const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const agentId = req.user._id
  const bookings = await repo.agentGetBookingsList(
    agentId,
    req.query.dateStart,
    req.query.dateEnd
  )
  return res.send(bookings)
}
