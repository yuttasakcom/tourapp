const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const busPathsProps = req.body
  await Promise.all(
    busPathsProps.map(busPath => repo.companyUpdateBusPaths(busPath))
  )
  return res.status(200).send({ message: 'update bus paths completed' })
}
