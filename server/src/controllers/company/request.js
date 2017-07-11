const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const agentId = req.body._id
  const companyId = req.user._id

  try {
    const exist = await repo.companyCheckMemberExist(companyId, agentId)

    if (exist) {
      const err = new Error('This agent is already member')
      err.status = 422
      return next(err)
    }

    const success = repo.companyRequest(companyId, agentId)

    if (!success) {
      const err = new Error('This agent is already request')
      err.status = 422
      return next(err)
    }

    return res.send({ message: 'Send request completed' })
  } catch (e) {
    return next(e)
  }
}
