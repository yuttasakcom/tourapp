import Company from '../../models/company'
import Agent from '../../models/agent'

export const request = async (req, res, next) => {
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

    const { nModified } = await Company.update(
      { _id: companyId },
      {
        $addToSet: { requestPendings: agentId }
      }
    )

    if (!nModified) {
      const err = new Error('This agent is already request')
      err.status = 422
      return next(err)
    }

    await Agent.update(
      { _id: agentId },
      {
        $addToSet: { acceptPendings: companyId }
      }
    )

    return res.send({ message: 'Send request completed' })
  } catch (e) {
    return next(e)
  }
}
