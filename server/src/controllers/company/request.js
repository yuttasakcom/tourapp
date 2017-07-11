const Company = require('../../models/company')
const Agent = require('../../models/agent')

module.exports = async (req, res, next) => {
  const agentId = req.body._id
  const companyId = req.user._id

  try {
    const exist = await Company.count({
      _id: companyId,
      agents: agentId
    })

    if (exist) {
      const err = new Error('This agent is already member')
      err.status = 422
      return next(err)
    }

    const [{ nModified }] = await Promise.all([
      Company.update(
        { _id: companyId },
        {
          $addToSet: { requestPendings: agentId }
        }
      ),
      Agent.update(
        { _id: agentId },
        {
          $addToSet: { acceptPendings: companyId }
        }
      )
    ])

    if (!nModified) {
      const err = new Error('This agent is already request')
      err.status = 422
      return next(err)
    }

    return res.send({ message: 'Send request completed' })
  } catch (e) {
    return next(e)
  }
}
