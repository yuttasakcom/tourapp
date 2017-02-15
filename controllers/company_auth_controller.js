const Company = require('../models/company')

module.exports = {
  signup(req, res, next) {
    const companyProps = req.body
    Company.findOne({ email: companyProps.email })
      .then(existingUser => {
        if (existingUser) {
          return res.status(422).send({ error: 'Email is in use' })
        }
        Company.create(companyProps)
          .then(company => res.status(201).send(company))
          .catch(next)
      })
      .catch(next)
  }
}
