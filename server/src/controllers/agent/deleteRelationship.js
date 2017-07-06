const Company = require('../../models/company')
const Agent = require('../../models/agent')

module.exports = async (req, res, next) => {
  const agentId = req.user._id
  const companyId = req.params.id

  await Promise.all([
    Company.update(
      { _id: companyId },
      {
        $pull: { agents: agentId }
      }
    ),
    Agent.update(
      { _id: agentId },
      {
        $pull: { companies: companyId }
      }
    )
  ])
  return res.send({ message: 'Delete relationship completed' })
}
