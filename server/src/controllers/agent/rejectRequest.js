const Agent = require('../../classes/Agent')

module.exports = async (req, res, next) => {
  const agent = new Agent(req.user._id)
  const companyId = req.params.id
  await agent.rejectRequest(companyId)
  return res.send({ message: 'Reject request completed' })
}
