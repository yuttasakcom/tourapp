import Agent from '../../models/agent'

export const getRequestPendingsList = async (req, res, next) => {
  const agentId = req.user._id

  const requestPendings = await Agent.findById(agentId, {
    _id: 0,
    requestPendings: 1
  }).populate('requestPendings', 'email')
  return res.send(requestPendings)
}
