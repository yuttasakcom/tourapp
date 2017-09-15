const Agent = require('mongoose').model('Agent')

module.exports = async (agentId, companyId) => {
  const { nModified } = await Agent.update(
    {
      _id: agentId
    },
    {
      $pull: {
        acceptPendings: companyId
      }
    }
  )
  return nModified
}
