const mongoose = require('mongoose')

const Schema = mongoose.Schema

const companySchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Email is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  agents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Agent'
    }
  ],
  requestPendings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Agent'
    }
  ],
  acceptPendings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Agent'
    }
  ]
})

const Company = mongoose.model('Company', companySchema)

module.exports = Company
