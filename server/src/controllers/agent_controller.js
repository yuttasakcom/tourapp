const Agent = require('../models/agent')
const Company = require('../models/company')
const Booking = require('../models/booking')
const Pkg = require('../models/pkg')
const helper = require('../helpers/authentication')
const jwt = require('jwt-simple')
const config = require('../config')

const tokenForAgent = agent => {
  const timestamp = new Date().getTime()
  return jwt.encode({
    _id: agent._id,
    sub: agent.email,
    role: 'agent',
    iat: timestamp,
  }, config.secret)
}


module.exports = {
  addBooking(req, res, next) {
    const user = req.user
    const bookingProps = req.body

    Agent.count({
        _id: user._id,
        companies: bookingProps.company,
      })
      .then(exist => {
        if (!exist) {
          let err = new Error('This company is not member')
          err.status = 401
          return next(err)
        }

        bookingProps.agent = user._id

        Booking.create(bookingProps)
          .then(booking => {
            res.send(booking)
          })
      })
  },

  addEmployee(req, res, next) {
    const agentId = req.user._id
    const employeeProps = req.body

    if (!(employeeProps.email && employeeProps.password)) {
      let err = new Error('Must provide email and password')
      err.status = 422
      return next(err)
    }

    helper.checkEmployeeEmailExist('Agent', agentId, employeeProps.email)
      .then(exist => {
        if (exist) {
          let err = new Error('Email is in use')
          err.status = 422
          return next(err)
        } else {
          helper.hashPassword(employeeProps.password)
            .then(hash => {
              employeeProps.password = hash
              Agent.update({ _id: agentId }, {
                  $push: { employees: employeeProps }
                })
                .then(() => {
                  res.status(201).send({ message: 'Create employee completed' })
                })
                .catch(next)
            })
            .catch(next)
        }
      })
  },

  getPkgsList(req, res, next) {
    const agentId = req.user._id

    Agent.findById(agentId, {
        _id: 0,
        companies: 1
      })
      .then(agent => {
        Pkg.find({
            company: {
              $in: agent.companies
            }
          }, {
            specialPrices: {
              $elemMatch: {
                agent: agentId
              }
            },
            name: 1,
            priceAdult: 1,
            priceChild: 1
          })
          .then(pkgs => {
            const resolvedPricePkgs = pkgs.map(pkg => {
              if (pkg.specialPrices.length) {
                pkg.priceAdult = pkg.specialPrices[0].priceAdult
                pkg.priceChild = pkg.specialPrices[0].priceChild
              }
              pkg.specialPrices = undefined
              return pkg
            })
            res.send(resolvedPricePkgs)
          })
      })
  },

  getCompaniesList(req, res, next) {
    const agentId = req.user._id

    Agent.findById(agentId, {
        _id: 0,
        companies: 1
      })
      .populate('companies')
      .then(agent => {
        res.send(agent.companies)
      })
      .catch(next)
  },

  signup(req, res, next) {
    const agentProps = req.body
    const agent = new Agent(agentProps)
    const validationErr = agent.validateSync()
    if (validationErr) {
      let err = new Error('Must provide email and password')
      err.status = 422
      return next(err)
    }

    helper.checkEmailExist('Agent', agent.email)
      .then(exist => {
        if (exist) {
          let err = new Error('Email is in use')
          err.status = 422
          return next(err)
        } else {
          helper.hashPassword(agent.password)
            .then(hash => {
              agent.password = hash
              agent.save()
                .then(agent => res.status(201).send({ token: tokenForAgent(agent) }))
                .catch(next)
            })
            .catch(next)
        }
      })
      .catch(next)
  },

  signin(req, res, next) {
    res.send({ token: tokenForAgent(req.user) })
  },

  profile(req, res, next) {
    res.send({ message: 'realy secret' })
  },

  request(req, res, next) {
    const companyId = req.body._id
    const agentId = req.user._id

    Agent.count({ _id: agentId, companies: companyId })
      .then(exist => {
        if (exist) {
          let err = new Error('This company is already member')
          err.status = 422
          return next(err)
        }

        Agent.update({ _id: agentId }, {
            $addToSet: { requestPendings: companyId }
          })
          .then(({ nModified }) => {
            if (nModified) {
              Company.update({ _id: companyId }, {
                  $addToSet: { acceptPendings: agentId }
                })
                .then(() => res.send({ message: 'Send request completed' }))
                .catch(next)
            } else {
              let err = new Error('This company is already request')
              err.status = 422
              return next(err)
            }
          })
          .catch(next)
      })
      .catch(next)
  },

  accept(req, res, next) {
    const companyId = req.body._id
    const agentId = req.user._id

    Agent.update({ _id: agentId }, {
        $pull: { acceptPendings: companyId }
      })
      .then(({ nModified }) => {
        if (nModified) {
          Company.update({ _id: companyId }, {
              $pull: { requestPendings: agentId }
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
    const agentId = req.user._id

    Agent.findById(agentId, { _id: 0, requestPendings: 1 })
      .then(requestPendings => {
        res.send(requestPendings)
      })
  },

  getAcceptPendingsList(req, res, next) {
    const agentId = req.user._id

    Agent.findById(agentId, { _id: 0, acceptPendings: 1 })
      .then(acceptPendings => {
        res.send(acceptPendings)
      })
  },

  cancelRequest(req, res, next) {
    const agentId = req.user._id
    const companyId = req.params.id

    Promise.all([
      Agent.update({ _id: agentId }, {
        $pull: { requestPendings: companyId }
      }),
      Company.update({ _id: companyId }, {
        $pull: { acceptPendings: agentId }
      })
    ]).then(() => {
      res.send({ message: 'Cancel request completed' })
    })
  },

  rejectRequest(req, res, next) {
    const agentId = req.user._id
    const companyId = req.params.id

    Promise.all([
      Agent.update({ _id: agentId }, {
        $pull: { acceptPendings: companyId }
      }),
      Company.update({ _id: companyId }, {
        $pull: { requestPendings: agentId }
      })
    ]).then(() => {
      res.send({ message: 'Reject request completed' })
    })
  },

  deleteRelationship(req, res, next) {
    const agentId = req.user._id
    const companyId = req.params.id

    Promise.all([
      Company.update({ _id: companyId }, {
        $pull: { agents: agentId }
      }),
      Agent.update({ _id: agentId }, {
        $pull: { companies: companyId }
      })
    ]).then(() => {
      res.send({ message: 'Delete relationship completed' })
    })
  }
}
