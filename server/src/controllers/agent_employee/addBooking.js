const AgentEmployee = require('../../classes/AgentEmployee')

module.exports = async (req, res, next) => {
  const { _id, agentId } = req.user
  const agentEmployee = new AgentEmployee(_id, agentId)
  const bookingProps = req.body
  try {
    const booking = await agentEmployee.book(bookingProps)
    return res.send(booking)
  } catch (e) {
    return next(e)
  }
}
