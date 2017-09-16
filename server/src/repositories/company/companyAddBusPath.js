const mongoose = require('mongoose')

const BusPath = mongoose.model('BusPath')

module.exports = busPathProps =>
  BusPath.findOneAndUpdate({ _id: mongoose.Types.ObjectId() }, busPathProps, {
    new: true,
    upsert: true,
    runValidators: true,
    populate: 'hotels'
  })
