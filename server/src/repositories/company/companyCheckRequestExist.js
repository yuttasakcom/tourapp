const Company = require('../../models/company')

module.exports = async (companyId, agentId) => {
  const { nModified } = Company.update(
    { _id: companyId },
    {
      $pull: { acceptPendings: agentId }
    }
  )
  return nModified
}
