const Pkg = require('mongoose').model('Pkg')

module.exports = companyId => Pkg.find({ company: companyId })
