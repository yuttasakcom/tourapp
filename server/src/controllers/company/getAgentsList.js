import Company from '../../models/company'

export const getAgentsList = async (req, res, next) => {
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
