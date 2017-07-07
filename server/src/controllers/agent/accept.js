const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.body._id
  const agentId = req.user._id

  const exist = await repo.agentCheckRequestExist(agentId, companyId)

  if (!exist) {
    const err = new Error('Request not found')
    err.status = 422
    return next(err)
  }

  await repo.agentAccept(agentId, companyId)

  return res.send({
    message: 'Accept request completed'
  })
}
