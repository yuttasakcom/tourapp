const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const agentId = req.user._id
  try {
    const agent = await repo.agentGetCompaniesList(agentId)
    return res.send(agent.companies)
  } catch (e) {
    return next(e)
  }
}
