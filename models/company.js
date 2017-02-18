const mongoose = require('./mongoose')
const Schema = mongoose.Schema
const helper = require('./helpers/authentication')

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
  helper.checkEmailExist('Company', this.email)
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

companySchema.methods.comparePassword = helper.comparePassword

const Company = mongoose.model('Company', companySchema)

module.exports = Company
