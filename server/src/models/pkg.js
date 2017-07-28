const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pkgSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  name: String,
  description: String,
  priceAdult: { type: Number, default: 0 },
  priceChild: { type: Number, default: 0 },
  priceAdultRecommended: { type: Number, default: 0 },
  printChildRecommended: { type: Number, default: 0 },
  specialPrices: [
    {
      agent: {
        type: Schema.Types.ObjectId,
        ref: 'Agent'
      },
      priceAdult: Number,
      priceChild: Number
    }
  ]
})

const Pkg = mongoose.model('Pkg', pkgSchema)

module.exports = Pkg
