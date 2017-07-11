const Pkg = require('../../models/pkg')

module.exports = pkgId => Pkg.remove({ _id: pkgId })
