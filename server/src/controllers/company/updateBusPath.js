const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const busPathProps = req.body
  const busPath = await repo.companyUpdateBusPath(companyId, busPathProps)
  if (busPath) {
    return res.status(200).send(busPath)
  }
  const err = new Error('update failed')
  err.status = 422
  return next(err)
}
