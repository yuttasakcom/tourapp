const BusPath = require('mongoose').model('BusPath')

module.exports = async (busPathId, busPathProps) =>
  BusPath.findByIdAndUpdate(
    busPathId,
    { $set: busPathProps },
    { new: true }
  ).populate('hotels')
