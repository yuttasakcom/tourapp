const repo = require('../../repositories')
const Agent = require('../../models/agent')
const Company = require('../../models/company')

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

    const [{ nModified }] = await Promise.all([
      Agent.update(
        { _id: agentId },
        {
          $addToSet: { requestPendings: companyId }
        }
      ),
      Company.update(
        { _id: companyId },
        {
          $addToSet: { acceptPendings: agentId }
        }
      )
    ])

    if (!nModified) {
      const err = new Error('This company is already request')
      err.status = 422
      return next(err)
    }

    return res.send({ message: 'Send request completed' })
  } catch (e) {
    return next(e)
  }
}
