import bcrypt from 'bcrypt-nodejs'
import mongoose from '../models/mongoose'

export const comparePassword = (candidatePassword, realPassword) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, realPassword, (err, isMatch) => {
      if (err) return reject(err)

      return resolve(isMatch)
    })
  })


export const checkEmailExist = (modelName, email) =>
  new Promise((resolve, reject) => {
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

export const checkEmployeeEmailExist = (modelName, employerId, email) =>
  new Promise((resolve, reject) => {
    const Employer = mongoose.model(modelName)
    Employer
      .count({
        _id: employerId,
        employees: {
          $elemMatch: {
            email,
          },
        },
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

export const hashPassword = password =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err)

      bcrypt.hash(password, salt, null, (hashErr, hash) => {
        if (hashErr) reject(hashErr)

        resolve(hash)
      })
    })
  })
