const BusPath = require('../../models/busPath')

module.exports = async (busPathId, busPathProps) =>
  BusPath.findByIdAndUpdate(
    busPathId,
    { $set: busPathProps },
    { new: true }
  ).populate('hotels')
