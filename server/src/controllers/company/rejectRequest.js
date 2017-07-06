const Company = require('../../models/company')
const Agent = require('../../models/agent')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const agentId = req.params.id

  await Promise.all([
    Company.update(
      { _id: companyId },
      {
        $pull: { acceptPendings: agentId }
      }
    ),
    Agent.update(
      { _id: agentId },
      {
        $pull: { requestPendings: companyId }
      }
    )
  ])
  return res.send({ message: 'Reject request completed' })
}
