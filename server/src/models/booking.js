const mongoose = require('./mongoose')
const touristSchema = require('./sub_documents/tourist')

const Schema = mongoose.Schema

const bookingSchema = new Schema({
  agent: {
    type: Schema.Types.ObjectId,
    ref: 'Agent'
  },
  employee: Schema.Types.ObjectId,
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  pkg: {
    _id: Schema.Types.ObjectId,
    name: String,
    priceAdult: Number,
    priceChild: Number
  },
  tourist: touristSchema,
  status: {
    type: Number,
    default: 0
  }
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking
