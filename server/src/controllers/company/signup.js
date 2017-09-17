const Company = require('mongoose').model('Company')
const generateToken = require('./generateToken')
const {
  checkEmailExist,
  hashPassword
} = require('../../helpers/authentication')

module.exports = async (req, res, next) => {
  const companyProps = req.body
  const company = new Company(companyProps)
  const validationErr = company.validateSync()

  if (validationErr) {
    const err = new Error('กรุณาระบุข้อมูลให้ครบ')
    err.status = 422
    return next(err)
  }

  try {
    const exist = await checkEmailExist('Company', company.email)

    if (exist) {
      const err = new Error('Email is in use')
      err.status = 422
      return next(err)
    }

    const hash = await hashPassword(company.password)
    company.password = hash
    const resCompany = await company.save()

    const token = generateToken(resCompany)
    res.cookie('jwt', token)
    return res.status(201).send({ token })
  } catch (e) {
    return next(e)
  }
}
