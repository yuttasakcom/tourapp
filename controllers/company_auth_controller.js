const Company = require('../models/company')

module.exports = {
  signup(req, res, next) {
    const companyProps = req.body
    Company.findOne({ email: companyProps.email })
      .then(existingUser => {
        if (existingUser) {
          let err = new Error('Email is in use')
          err.status = 422
          next(err)
        }
        const company = new Company(companyProps)
        const validationErr = company.validateSync()
        if (validationErr) {
          let err = new Error('Must provide email or password')
          err.status = 422
          next(err)
        }
        company.save()
          .then(company => res.status(201).send({ token: 'mock' }))
          .catch(next)
      })
      .catch(next)
  }
}
