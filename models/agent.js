const mongoose = require('./mongoose')
const Schema = mongoose.Schema

const agentSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Name is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
})

const Agent = mongoose.model('Agent', agentSchema)

module.exports = Agent