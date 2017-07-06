const Pkg = require('../../models/pkg')

module.exports = async (req, res, next) => {
  const pkgId = req.params.id

  await Pkg.remove({ _id: pkgId })
  return res.send({ message: 'Delete package completed' })
}
