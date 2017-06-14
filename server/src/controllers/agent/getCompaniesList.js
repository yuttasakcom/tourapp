import Agent from '../../models/agent'

export const getCompaniesList = async (req, res, next) => {
  const agentId = req.user._id

  try {
    const agent = await Agent.findById(agentId, {
      _id: 0,
      companies: 1
    }).populate('companies')

    return res.send(agent.companies)
  } catch (e) {
    return next(e)
  }
}
