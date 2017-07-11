const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const agentId = req.user._id
  const companyId = req.body._id

  try {
    const exist = await repo.agentCheckMemberExist(agentId, companyId)

    if (exist) {
      const err = new Error('This company is already member')
      err.status = 422
      return next(err)
    }

    const success = await repo.agentRequest(agentId, companyId)

    if (!success) {
      const err = new Error('This company is already request')
      err.status = 422
      return next(err)
    }

    return res.send({ message: 'Send request completed' })
  } catch (e) {
    return next(e)
  }
}
