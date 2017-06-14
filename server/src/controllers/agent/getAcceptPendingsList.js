import Agent from '../../models/agent'

export const getAcceptPendingsList = async (req, res, next) => {
  const agentId = req.user._id

  const acceptPendings = await Agent.findById(agentId, {
    _id: 0,
    acceptPendings: 1
  })
  return res.send(acceptPendings)
}
