const mongoose = require('./mongoose')
const Schema = mongoose.Schema
const helper = require('./helpers/authentication')

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
  helper.checkEmailExist('Agent', this.email)
    .then(exist => {
      if (exist) {
        let err = new Error('Email is in use')
        err.status = 422
        next(err)
      } else {
        helper.hashPassword(this.password)
          .then(hash => {
            this.password = hash
            next()
          })
          .catch(next)
      }
    })
    .catch(next)
})

agentSchema.methods.comparePassword = helper.comparePassword

const Agent = mongoose.model('Agent', agentSchema)

module.exports = Agent
