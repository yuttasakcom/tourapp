const BusPath = require('mongoose').model('BusPath')

module.exports = busPathId => BusPath.remove({ _id: busPathId })
