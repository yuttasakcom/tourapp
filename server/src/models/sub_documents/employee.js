const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employeeSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  name: String,
  phoneNumber: String
})

module.exports = employeeSchema
