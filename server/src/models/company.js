const mongoose = require('mongoose')
const employeeSchema = require('./sub_documents/employee')

const Schema = mongoose.Schema

const companySchema = new Schema({
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
  adminName: {
    type: String,
    required: [true, 'Admin name is required']
  },
  adminPhoneNumber: {
    type: String,
    required: [true, 'Admin phone number is required']
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
  ],
  employees: [employeeSchema]
})

mongoose.model('Company', companySchema)
