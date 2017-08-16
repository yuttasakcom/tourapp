const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const busPathId = req.params.id
  await repo.companyDeleteBusPath(companyId, busPathId)
  return res.send({ message: 'Delete bus path completed' })
}
