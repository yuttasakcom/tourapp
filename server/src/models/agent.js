const mongoose = require('mongoose')
const employeeSchema = require('./sub_documents/employee')

const Schema = mongoose.Schema

const agentSchema = new Schema({
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
  companies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Company'
    }
  ],
  requestPendings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Company'
    }
  ],
  acceptPendings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Company'
    }
  ],
  employees: [employeeSchema]
})

const Agent = mongoose.model('Agent', agentSchema)

module.exports = Agent
