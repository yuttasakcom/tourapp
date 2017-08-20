const mongoose = require('mongoose')

const Schema = mongoose.Schema

const busPathSchema = new Schema({
  name: String,
  description: String,
  pkg: {
    type: Schema.Types.ObjectId,
    ref: 'Pkg'
  },
  hotels: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Hotel'
    }
  ]
})

module.exports = busPathSchema
