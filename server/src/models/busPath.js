const mongoose = require('mongoose')

const Schema = mongoose.Schema

const busPathSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  pkg: {
    type: Schema.Types.ObjectId,
    ref: 'Pkg'
  },
  name: String,
  description: String,
  hotels: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Hotel'
    }
  ]
})

const BusPath = mongoose.model('BusPath', busPathSchema)

module.exports = BusPath
