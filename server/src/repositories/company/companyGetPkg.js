const Pkg = require('../../models/pkg')

module.exports = pkgId => Pkg.findById(pkgId)
