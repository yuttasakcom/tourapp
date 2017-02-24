const mongoose = require('./mongoose')
const pkgSchema = require('./sub_documents/pkg')
const Schema = mongoose.Schema
const helper = require('./helpers/authentication')

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
  pkgs: [pkgSchema],
  agents: [{
    type: Schema.Types.ObjectId,
    ref: 'Agent'
  }],
  requestPendings: [{
    type: Schema.Types.ObjectId,
    ref: 'Agent'
  }],
  acceptPendings: [{
    type: Schema.Types.ObjectId,
    ref: 'Agent'
  }]
})

const Company = mongoose.model('Company', companySchema)

module.exports = Company
