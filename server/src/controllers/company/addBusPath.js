const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const busPathProps = req.body
  const busPath = await repo.companyAddBusPath(companyId, busPathProps)
  if (busPath) {
    return res.status(201).send(busPath)
  }
  const err = new Error('sorry bus path name can not dupplicate')
  err.status = 422
  return next(err)
}
