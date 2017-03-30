import Company from '../../models/company'

export default (req, res, next) => {
  const companyId = req.user._id

  Company
    .findById(companyId, {
      _id: 0,
      agents: 1,
    })
    .populate('agents')
    .then(company => {
      res.send(company.agents)
    })
    .catch(next)
}
