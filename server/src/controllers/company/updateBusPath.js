const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const busPathId = req.params.id
  const busPathProps = req.body
  try {
    const busPath = await repo.companyUpdateBusPath(busPathId, busPathProps)
    return res.send(busPath)
  } catch (e) {
    return next(e)
  }
}
