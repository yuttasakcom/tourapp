const mongoose = require('./mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

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
  const self = this
  Agent.findOne({ email: self.email })
    .then(existingAgent => {
      if (existingAgent) {
        let err = new Error('Email is in use')
        err.status = 422
        next(err)
      } else {
        bcrypt.genSalt(10, function(err, salt) {
          if (err) return next(err)

          bcrypt.hash(self.password, salt, null, function(err, hash) {
            if (err) return next(err)

            self.password = hash
            next()
          })
        })
      }
    })
    .catch(next)
})

agentSchema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return reject(err)

      resolve(isMatch)
    })
  })
}

const Agent = mongoose.model('Agent', agentSchema)

module.exports = Agent
