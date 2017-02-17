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

agentSchema.pre('save', function(next) {
  const Agent = mongoose.model('Agent')
  Agent.findOne({ email: this.email })
    .then(existingAgent => {
      if (existingAgent) {
        let err = new Error('Email is in use')
        err.status = 422
        next(err)
      } else {
        next()
      }
    })
    .catch(next)
})

const Agent = mongoose.model('Agent', agentSchema)

module.exports = Agent
