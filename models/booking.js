const mongoose = require('./mongoose')
const touristSchema = require('./sub_documents/tourist')
const Schema = mongoose.Schema

const bookingSchema = new Schema({
  agentId: {
    type: Schema.Types.ObjectId,
    ref: 'Agent'
  },
  employeeId: Schema.Types.ObjectId,
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  pkgId: Schema.Types.ObjectId,
  tourist: touristSchema
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking
