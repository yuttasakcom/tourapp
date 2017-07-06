const Agent = require('../../models/agent')

module.exports = async (req, res, next) => {
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
