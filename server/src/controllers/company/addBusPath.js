const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const busPathProps = req.body
  const company = await repo.companyAddBusPath(companyId, busPathProps)
  return res.status(201).send(company)
}
