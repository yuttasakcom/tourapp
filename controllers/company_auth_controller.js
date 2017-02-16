const Company = require('../models/company')
const jwt = require('jwt-simple')
const config = require('../config')

const tokenForCompany = (company) => {
  const timestamp = new Date().getTime()
  return jwt.encode({
    sub: company.email,
    iat: timestamp
  }, config.secret)
}

module.exports = {
  signup(req, res, next) {
    const companyProps = req.body
    const company = new Company(companyProps)
    const validationErr = company.validateSync()
    if (validationErr) {
      let err = new Error('Must provide email or password')
      err.status = 422
      return next(err)
    }

    company.save()
      .then(company => res.status(201).send({ token: tokenForCompany(company) }))
      .catch(next)
  },

  signin(req, res, next) {
    res.send({ token: 'mock' })
  }
}
