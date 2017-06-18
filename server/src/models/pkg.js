import mongoose from 'mongoose'

const Schema = mongoose.Schema

const pkgSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  name: String,
  description: String,
  priceAdult: Number,
  priceChild: Number,
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

export default Pkg
