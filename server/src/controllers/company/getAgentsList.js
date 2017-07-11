const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  try {
    const agents = await repo.companyGetAgentsList(companyId)
    return res.send(agents)
  } catch (e) {
    return next(e)
  }
}
