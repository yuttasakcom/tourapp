const Pkg = require('mongoose').model('Pkg')

module.exports = (pkgId, pkgProps) =>
  Pkg.findByIdAndUpdate(pkgId, { $set: pkgProps }, { new: true })
