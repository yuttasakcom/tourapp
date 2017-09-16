const Pkg = require('mongoose').model('Pkg')

module.exports = pkgId => Pkg.findById(pkgId)
