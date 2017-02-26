const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pkgSchema = new Schema({
  name: String,
  description: String,
  priceAdult: Number,
  priceChild: Number,
  specialPrices: [{
    agent: {
      type: Schema.Types.ObjectId,
      ref: 'Agent'
    },
    priceAdult: Number,
    priceChild: Number
  }]
})

module.exports = pkgSchema
