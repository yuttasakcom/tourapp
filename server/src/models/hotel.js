const mongoose = require('mongoose')

const Schema = mongoose.Schema

const hotelSchema = new Schema({
  name: String
})

const Hotel = mongoose.model('Hotel', hotelSchema)

module.exports = Hotel
