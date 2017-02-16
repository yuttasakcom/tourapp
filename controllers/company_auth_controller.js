const Company = require('../models/company')

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
      .then(company => res.status(201).send({ token: 'mock' }))
      .catch(next)
  }
}
