const Company = require('../models/company')

module.exports = {
  signup(req, res, next) {
  	const companyProps = req.body

  	Company.create(companyProps)
  		.then(company => res.status(201).send(company))
  		.catch(next)
  }
}
