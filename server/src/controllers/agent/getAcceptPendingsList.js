const Agent = require('../../models/agent')

module.exports = async (req, res, next) => {
  const agentId = req.user._id

  const acceptPendings = await Agent.findById(agentId, {
    _id: 0,
    acceptPendings: 1
  }).populate('acceptPendings', 'email')
  return res.send(acceptPendings)
}
