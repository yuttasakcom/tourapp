const Pkg = require('mongoose').model('Pkg')

module.exports = pkgId => Pkg.remove({ _id: pkgId })
