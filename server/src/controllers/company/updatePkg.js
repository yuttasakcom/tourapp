const Pkg = require('../../models/pkg')

module.exports = async (req, res, next) => {
  const pkgId = req.params.id
  const pkgProps = req.body

  try {
    const pkg = await Pkg.findByIdAndUpdate(
      pkgId,
      {
        $set: pkgProps
      },
      {
        new: true
      }
    )
    return res.send(pkg)
  } catch (e) {
    return next(e)
  }
}
