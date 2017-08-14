const mongoose = require('mongoose')

const Schema = mongoose.Schema

const touristSchema = new Schema({
  name: String,
  phoneNumber: String,
  email: String,
  hotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel'
  },
  roomNumber: String,
  address: String,
  adult: Number,
  child: Number,
  nationality: String,
  date: Date,
  note: String
})

module.exports = touristSchema
