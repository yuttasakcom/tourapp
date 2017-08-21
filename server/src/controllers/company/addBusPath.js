const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  req.body.company = companyId
  const busPathProps = req.body
  const busPath = await repo.companyAddBusPath(busPathProps)
  return res.status(201).send(busPath)
}
