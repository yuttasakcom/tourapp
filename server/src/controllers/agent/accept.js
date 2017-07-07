const Agent = require('../../classes/Agent')

module.exports = async (req, res, next) => {
  const agent = new Agent(req.user._id)
  const companyId = req.body._id

  const exist = await agent.checkRequestExist(companyId)

  if (!exist) {
    const err = new Error('Request not found')
    err.status = 422
    return next(err)
  }

  await agent.accept(companyId)

  return res.send({
    message: 'Accept request completed'
  })
}
