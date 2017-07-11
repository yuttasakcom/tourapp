const Company = require('../../models/company')

module.exports = async companyId => {
  const { agents } = await Company.findById(companyId, {
    _id: 0,
    agents: 1
  }).populate('agents')
  return agents
}
