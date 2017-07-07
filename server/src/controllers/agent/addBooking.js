const Agent = require('../../classes/Agent')

module.exports = async (req, res, next) => {
  const agent = new Agent(req.user._id)
  const bookingProps = req.body

  const exist = await agent.checkMemberExist(bookingProps.company)

  if (!exist) {
    const err = new Error('This company is not member')
    err.status = 401
    return next(err)
  }

  const booking = await agent.book(bookingProps)
  return res.send(booking)
}
