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

companySchema.pre('save', function(next) {
  if (this.isNew) {
    helper.checkEmailExist('Company', this.email)
      .then(exist => {
        if (exist) {
          let err = new Error('Email is in use')
          err.status = 422
          return next(err)
        } else {
          helper.hashPassword(this.password)
            .then(hash => {
              this.password = hash
              return next()
            })
            .catch(next)
        }
      })
      .catch(next)
  } else {
    return next()
  }
})

companySchema.methods.comparePassword = helper.comparePassword

const Company = mongoose.model('Company', companySchema)

module.exports = Company
