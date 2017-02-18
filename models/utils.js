const bcrypt = require('bcrypt-nodejs')

module.exports = {
  comparePassword(candidatePassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return reject(err)

        resolve(isMatch)
      })
    })
  }
}
