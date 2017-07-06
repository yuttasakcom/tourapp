const Company = require('../../models/company')
const Agent = require('../../models/agent')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const agentId = req.params.id

  await Promise.all([
    Company.update(
      { _id: companyId },
      {
        $pull: { requestPendings: agentId }
      }
    ),
    Agent.update(
      { _id: agentId },
      {
        $pull: { acceptPendings: companyId }
      }
    )
  ])
  return res.send({ message: 'Cancel request completed' })
}
