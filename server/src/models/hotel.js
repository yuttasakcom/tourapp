const mongoose = require('mongoose')

const Schema = mongoose.Schema

const hotelSchema = new Schema({
  name: String
})

mongoose.model('Hotel', hotelSchema)
