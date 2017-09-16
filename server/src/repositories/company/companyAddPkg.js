const Pkg = require('mongoose').model('Pkg')

module.exports = pkgProps => Pkg.create(pkgProps)
