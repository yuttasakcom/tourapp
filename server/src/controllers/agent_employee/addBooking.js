const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const { _id, agentId } = req.user
  const bookingProps = req.body

  const exist = await repo.agentCheckMemberExist(agentId, bookingProps.company)

  if (!exist) {
    const err = new Error('This company is not member')
    err.status = 401
    return next(err)
  }

  bookingProps.agent = agentId
  bookingProps.employee = _id
  const booking = await repo.book(bookingProps)
  return res.send(booking)
}
