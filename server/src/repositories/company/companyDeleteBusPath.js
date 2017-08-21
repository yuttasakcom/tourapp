const BusPath = require('../../models/busPath')

module.exports = busPathId => BusPath.remove({ _id: busPathId })
