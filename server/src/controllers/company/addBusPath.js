const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const busPathProps = req.body
  const company = await repo.companyAddBusPath(companyId, busPathProps)
  if (company) {
    return res.status(201).send(company.busPaths[0])
  }
  const err = new Error('sorry bus path name can not dupplicate')
  err.status = 422
  return next(err)
}
