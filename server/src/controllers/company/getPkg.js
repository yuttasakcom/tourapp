const Pkg = require('../../models/pkg')

module.exports = async (req, res, next) => {
  const pkgId = req.params.id

  try {
    const pkg = await Pkg.findById(pkgId)
    return res.send(pkg)
  } catch (e) {
    return next(e)
  }
}
