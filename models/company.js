const mongoose = require('./mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const utils = require('./utils')

const companySchema = new Schema({
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

companySchema.pre('save', function(next) {
  const Company = mongoose.model('Company')
  const self = this
  Company.findOne({ email: self.email })
    .then(existingCompany => {
      if (existingCompany) {
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

companySchema.methods.comparePassword = utils.comparePassword

const Company = mongoose.model('Company', companySchema)

module.exports = Company
