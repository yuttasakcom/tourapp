const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const busPathId = req.params.id
  await repo.companyDeleteBusPath(busPathId)
  return res.send({ message: 'Delete bus path completed' })
}
