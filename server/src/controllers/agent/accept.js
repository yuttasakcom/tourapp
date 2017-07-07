const Agent = require('../../classes/Agent')

module.exports = async (req, res, next) => {
  const agent = new Agent(req.user._id)
  const companyId = req.body._id

  try {
    await agent.accept(companyId)
  } catch (e) {
    return next(e)
  }

  return res.send({
    message: 'Accept request completed'
  })
}
