const Company = require('../../models/company')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  try {
    const company = await Company.findById(companyId, {
      _id: 0,
      agents: 1
    }).populate('agents')
    return res.send(company.agents)
  } catch (e) {
    return next(e)
  }
}
