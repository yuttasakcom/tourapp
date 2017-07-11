const Pkg = require('../../models/pkg')

module.exports = companyId => Pkg.find({ company: companyId })
