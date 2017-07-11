const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const agentId = req.body._id

  const exist = await repo.companyCheckRequestExist(companyId, agentId)

  if (!exist) {
    const err = new Error('Request not found')
    err.status = 422
    return next(err)
  }

  await repo.companyAccept(companyId, agentId)
  return res.send({ message: 'Accept request completed' })
}
