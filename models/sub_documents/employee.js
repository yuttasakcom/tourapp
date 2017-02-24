const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
  email: String,
  password: String,
  name: String,
  phoneNumber: String
})

module.exports = employeeSchema
