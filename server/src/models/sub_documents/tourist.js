import mongoose from 'mongoose'

const Schema = mongoose.Schema

const touristSchema = new Schema({
  name: String,
  phoneNumber: String,
  hotel: String,
  adult: Number,
  child: Number,
  nationality: String,
  date: Date,
  note: String,
})

module.exports = touristSchema
