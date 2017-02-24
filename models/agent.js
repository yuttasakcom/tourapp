const mongoose = require('./mongoose')
const employeeSchema = require('./sub_documents/employee')
const Schema = mongoose.Schema
const helper = require('./helpers/authentication')

const agentSchema = new Schema({
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
  companies: [{
    type: Schema.Types.ObjectId,
    ref: 'Company'
  }],
  requestPendings: [{
    type: Schema.Types.ObjectId,
    ref: 'Company'
  }],
  acceptPendings: [{
    type: Schema.Types.ObjectId,
    ref: 'Company'
  }],
  employees: [employeeSchema]
})

agentSchema.methods.comparePassword = helper.comparePassword

const Agent = mongoose.model('Agent', agentSchema)

module.exports = Agent
