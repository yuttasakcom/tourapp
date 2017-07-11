const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const agentId = req.user._id
  const bookingProps = req.body

  const exist = await repo.agentCheckMemberExist(agentId, bookingProps.company)

  if (!exist) {
    const err = new Error('This company is not member')
    err.status = 401
    return next(err)
  }

  bookingProps.agent = agentId
  const booking = await repo.agentAddBooking(bookingProps)
  return res.send(booking)
}
