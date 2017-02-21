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

  addPkg(req, res, next) {
    const companyId = req.user._id
    const pkgProp = req.body
    Company.update({ _id: companyId }, {
        $push: { pkgs: pkgProp }
      })
      .then(() => {
        res.status(201).send({ message: 'Create package completed' })
      })
  },

  request(req, res, next) {
    const agentId = req.body._id
    const companyId = req.user._id

    Company.count({ _id: companyId, agents: agentId })
      .then(exist => {
        if (exist) {
          let err = new Error('This agent is already member')
          err.status = 422
          return next(err)
        }

        Company.update({ _id: companyId }, {
            $addToSet: { requestPendings: agentId }
          })
          .then(({ nModified }) => {
            if (nModified) {
              Agent.update({ _id: agentId }, {
                  $addToSet: { acceptPendings: companyId }
                })
                .then(() => res.send({ message: 'Send request completed' }))
                .catch(next)
            } else {
              let err = new Error('This agent is already request')
              err.status = 422
              return next(err)
            }
          })
          .catch(next)
      })
      .catch(next)
  },

  accept(req, res, next) {
    const agentId = req.body._id
    const companyId = req.user._id

    Company.update({ _id: companyId }, {
        $pull: { acceptPendings: agentId }
      })
      .then(({ nModified }) => {
        if (nModified) {
          Agent.update({ _id: agentId }, {
              $pull: { requestPendings: companyId }
            })
            .then(() => {
              Promise.all([
                  Company.update({ _id: companyId }, {
                    $addToSet: { agents: agentId }
                  }),
                  Agent.update({ _id: agentId }, {
                    $addToSet: { companies: companyId }
                  })
                ])
                .then(() => {
                  res.send({ message: 'Accept request completed' })
                })
            })
        } else {
          let err = new Error('Request not found')
          err.status = 422
          next(err)
        }
      })
  },

  getRequestPendingsList(req, res, next) {
    const companyId = req.user._id

    Company.findById(companyId, { _id: 0, requestPendings: 1 })
      .then(requestPendings => {
        res.send(requestPendings)
      })
  },

  getAcceptPendingsList(req, res, next) {
    const companyId = req.user._id

    Company.findById(companyId, { _id: 0, acceptPendings: 1 })
      .then(acceptPendings => {
        res.send(acceptPendings)
      })
  },

  cancelRequest(req, res, next) {
    const agentId = req.body._id
    const companyId = req.user._id

    Promise.all([
      Company.update({ _id: companyId }, {
        $pull: { requestPendings: agentId }
      }),
      Agent.update({ _id: agentId }, {
        $pull: { acceptPendings: companyId }
      })
    ]).then(() => {
      res.send({ message: 'Cancel request completed' })
    })
  }
}
