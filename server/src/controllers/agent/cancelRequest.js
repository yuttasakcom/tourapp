const Agent = require('../../models/agent')
const Company = require('../../models/company')

module.exports = async (req, res, next) => {
  const agentId = req.user._id
  const companyId = req.params.id

  await Promise.all([
    Agent.update(
      { _id: agentId },
      {
        $pull: { requestPendings: companyId }
      }
    ),
    Company.update(
      { _id: companyId },
      {
        $pull: { acceptPendings: agentId }
      }
    )
  ])
  return res.send({ message: 'Cancel request completed' })
}
