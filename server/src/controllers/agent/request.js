const Agent = require('../../models/agent')
const Company = require('../../models/company')

module.exports = async (req, res, next) => {
  const companyId = req.body._id
  const agentId = req.user._id

  try {
    const exist = await Agent.count({ _id: agentId, companies: companyId })

    if (exist) {
      const err = new Error('This company is already member')
      err.status = 422
      return next(err)
    }

    const { nModified } = await Agent.update(
      { _id: agentId },
      {
        $addToSet: { requestPendings: companyId }
      }
    )

    if (!nModified) {
      const err = new Error('This company is already request')
      err.status = 422
      return next(err)
    }

    await Company.update(
      { _id: companyId },
      {
        $addToSet: { acceptPendings: agentId }
      }
    )

    return res.send({ message: 'Send request completed' })
  } catch (e) {
    return next(e)
  }
}
