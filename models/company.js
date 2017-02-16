const mongoose = require('./mongoose')
const Schema = mongoose.Schema

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
  Company.findOne({ email: this.email })
    .then(existingCompany => {
      if (existingCompany) {
        let err = new Error('Email is in use')
        err.status = 422
        next(err)
      } else {
      	next()
      }
    })
    .catch(next)
})

const Company = mongoose.model('Company', companySchema)

module.exports = Company
