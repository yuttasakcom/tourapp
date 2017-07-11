const Pkg = require('../../models/pkg')

module.exports = (pkgId, pkgProps) =>
  Pkg.findByIdAndUpdate(
    pkgId,
    {
      $set: pkgProps
    },
    {
      new: true
    }
  )
