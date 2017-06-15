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
  new Promise(async (resolve, reject) => {
    const User = mongoose.model(modelName)
    try {
      const exist = await User.count({ email })
      resolve(exist)
    } catch (e) {
      reject(e)
    }
  })

export const checkEmployeeEmailExist = (modelName, employerId, email) =>
  new Promise(async (resolve, reject) => {
    const Employer = mongoose.model(modelName)

    try {
      const exist = await Employer.count({
        _id: employerId,
        employees: {
          $elemMatch: {
            email
          }
        }
      })
      resolve(exist)
    } catch (e) {
      reject(e)
    }
  })

export const hashPassword = password =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err)

      return bcrypt.hash(password, salt, null, (hashErr, hash) => {
        if (hashErr) return reject(hashErr)

        return resolve(hash)
      })
    })
  })
