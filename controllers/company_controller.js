const Company = require('../models/company')
const Agent = require('../models/agent')
const jwt = require('jwt-simple')
const config = require('../config')

const tokenForCompany = (company) => {
  const timestamp = new Date().getTime()
  return jwt.encode({
    _id: company._id,
    sub: company.email,
    role: 'company',
    iat: timestamp
  }, config.secret)
}

module.exports = {
  signup(req, res, next) {
    const companyProps = req.body
    const company = new Company(companyProps)
    const validationErr = company.validateSync()
    if (validationErr) {
      let err = new Error('Must provide email and password')
      err.status = 422
      return next(err)
    }

    company.save()
      .then(company => res.status(201).send({ token: tokenForCompany(company) }))
      .catch(next)
  },

  signin(req, res, next) {
    res.send({ token: tokenForCompany(req.user) })
  },

  profile(req, res, next) {
    res.send({ message: 'realy secret' })
  },

  addRelationship(req, res, next) {
    const agentId = req.body._id
    const companyId = req.user._id

    Company.update({ _id: companyId }, {
        $addToSet: { 'agents': agentId }
      })
      .then(({ nModified }) => {
        if (nModified) {
          Agent.update({ _id: agentId }, {
              $addToSet: { 'companies': companyId }
            })
            .then(() => res.send({ message: 'Add relationshop completed' }))
            .catch(next)
        } else {
          let err = new Error('This agent is already member')
          err.status = 422
          return next(err)
        }
      })
  }
}
