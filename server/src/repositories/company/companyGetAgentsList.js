const Company = require('mongoose').model('Company')

module.exports = async companyId => {
  const { agents } = await Company.findById(companyId, {
    _id: 0,
    agents: 1
  }).populate('agents')
  return agents
}
