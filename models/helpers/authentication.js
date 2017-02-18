const bcrypt = require('bcrypt-nodejs')
const mongoose = require('../mongoose')

module.exports = {
  comparePassword(candidatePassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return reject(err)

        resolve(isMatch)
      })
    })
  },

  checkEmailExist(modelName, email) {
    return new Promise((resolve, reject) => {
      const User = mongoose.model(modelName)
      User.findOne({ email })
        .then(existingUser => {
          if (existingUser) {
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
