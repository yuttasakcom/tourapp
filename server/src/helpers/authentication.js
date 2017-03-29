const bcrypt = require('bcrypt-nodejs')
const mongoose = require('../models/mongoose')

module.exports = {
  comparePassword(candidatePassword, realPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, realPassword, function(err, isMatch) {
        if (err) return reject(err)

        resolve(isMatch)
      })
    })
  },

  checkEmailExist(modelName, email) {
    return new Promise((resolve, reject) => {
      const User = mongoose.model(modelName)
      User.count({ email })
        .then(exist => {
          if (exist) {
            resolve(true)
          } else {
            resolve(false)
          }
        })
        .catch(reject)
    })
  },

  checkEmployeeEmailExist(modelName, employerId, email) {
    return new Promise((resolve, reject) => {
      const Employer = mongoose.model(modelName)
      Employer.count({
        _id: employerId,
        employees: {
          $elemMatch: {
            email: email
          }
        }
      })
      .then(exist => {
        if (exist) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch(reject)
    })
  },

  hashPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function(err, salt) {
        if (err) reject(err)

        bcrypt.hash(password, salt, null, function(err, hash) {
          if (err) reject(err)

          resolve(hash)
        })
      })
    })
  }
}
