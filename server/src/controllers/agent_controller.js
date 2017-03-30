import jwt from 'jwt-simple'
import Agent from '../models/agent'
import Company from '../models/company'
import Booking from '../models/booking'
import Pkg from '../models/pkg'
import {
  checkEmailExist,
  hashPassword,
  checkEmployeeEmailExist
} from '../helpers/authentication'
import config from '../config'

const tokenForAgent = agent => {
  const timestamp = new Date().getTime()
  return jwt.encode({
    _id: agent._id,
    sub: agent.email,
    role: 'agent',
    iat: timestamp,
  }, config.secret)
}


export const addBooking = (req, res, next) => {
  const user = req.user
  const bookingProps = req.body

  Agent
    .count({
      _id: user._id,
      companies: bookingProps.company,
    })
    .then(exist => {
      if (!exist) {
        const err = new Error('This company is not member')
        err.status = 401
        return next(err)
      }

      bookingProps.agent = user._id

      return Booking.create(bookingProps)
        .then(booking => {
          res.send(booking)
        })
    })
}

export const addEmployee = (req, res, next) => {
  const agentId = req.user._id
  const employeeProps = req.body

  if (!(employeeProps.email && employeeProps.password)) {
    const err = new Error('Must provide email and password')
    err.status = 422
    return next(err)
  }

  return checkEmployeeEmailExist('Agent', agentId, employeeProps.email)
    .then(exist => {
      if (exist) {
        const err = new Error('Email is in use')
        err.status = 422
        return next(err)
      }
      return hashPassword(employeeProps.password)
        .then(hash => {
          employeeProps.password = hash
          Agent
            .update({ _id: agentId }, {
              $push: { employees: employeeProps },
            })
            .then(() => {
              res.status(201).send({ message: 'Create employee completed' })
            })
            .catch(next)
        })
        .catch(next)
    })
}

export const getPkgsList = (req, res, next) => {
  const agentId = req.user._id

  Agent
    .findById(agentId, {
      _id: 0,
      companies: 1,
    })
    .then(agent => {
      Pkg
        .find({
          company: {
            $in: agent.companies,
          },
        }, {
          specialPrices: {
            $elemMatch: {
              agent: agentId,
            },
          },
          name: 1,
          priceAdult: 1,
          priceChild: 1,
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
}

export const getCompaniesList = (req, res, next) => {
  const agentId = req.user._id

  Agent
    .findById(agentId, {
      _id: 0,
      companies: 1,
    })
    .populate('companies')
    .then(agent => {
      res.send(agent.companies)
    })
    .catch(next)
}

export const signup = (req, res, next) => {
  const agentProps = req.body
  const agent = new Agent(agentProps)
  const validationErr = agent.validateSync()
  if (validationErr) {
    const err = new Error('Must provide email and password')
    err.status = 422
    return next(err)
  }

  return checkEmailExist('Agent', agent.email)
    .then(exist => {
      if (exist) {
        const err = new Error('Email is in use')
        err.status = 422
        return next(err)
      }
      return hashPassword(agent.password)
        .then(hash => {
          agent.password = hash
          agent.save()
            .then(resAgent =>
              res.status(201).send({ token: tokenForAgent(resAgent) })
            )
            .catch(next)
        })
        .catch(next)
    })
    .catch(next)
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForAgent(req.user) })
}

export const profile = (req, res, next) => {
  res.send({ message: 'realy secret' })
}

export const request = (req, res, next) => {
  const companyId = req.body._id
  const agentId = req.user._id

  Agent
    .count({ _id: agentId, companies: companyId })
    .then(exist => {
      if (exist) {
        const err = new Error('This company is already member')
        err.status = 422
        return next(err)
      }

      return Agent
        .update({ _id: agentId }, {
          $addToSet: { requestPendings: companyId },
        })
        .then(({ nModified }) => {
          if (nModified) {
            return Company
              .update({ _id: companyId }, {
                $addToSet: { acceptPendings: agentId },
              })
              .then(() => res.send({ message: 'Send request completed' }))
              .catch(next)
          }
          const err = new Error('This company is already request')
          err.status = 422
          return next(err)
        })
        .catch(next)
    })
    .catch(next)
}

export const accept = (req, res, next) => {
  const companyId = req.body._id
  const agentId = req.user._id

  Agent
    .update({ _id: agentId }, {
      $pull: { acceptPendings: companyId },
    })
    .then(({ nModified }) => {
      if (nModified) {
        Company
          .update({ _id: companyId }, {
            $pull: { requestPendings: agentId },
          })
          .then(() => {
            const addAgentToCompany = Company
              .update({ _id: companyId }, {
                $addToSet: { agents: agentId },
              })

            const addCompanyToAgent = Agent
              .update({ _id: agentId }, {
                $addToSet: { companies: companyId },
              })

            Promise.all([addAgentToCompany, addCompanyToAgent])
              .then(() => {
                res.send({ message: 'Accept request completed' })
              })
          })
      } else {
        const err = new Error('Request not found')
        err.status = 422
        next(err)
      }
    })
}

export const getRequestPendingsList = (req, res, next) => {
  const agentId = req.user._id

  Agent
    .findById(agentId, { _id: 0, requestPendings: 1 })
    .then(requestPendings => {
      res.send(requestPendings)
    })
}

export const getAcceptPendingsList = (req, res, next) => {
  const agentId = req.user._id

  Agent
    .findById(agentId, { _id: 0, acceptPendings: 1 })
    .then(acceptPendings => {
      res.send(acceptPendings)
    })
}

export const cancelRequest = (req, res, next) => {
  const agentId = req.user._id
  const companyId = req.params.id

  Promise.all([
    Agent.update({ _id: agentId }, {
      $pull: { requestPendings: companyId },
    }),
    Company.update({ _id: companyId }, {
      $pull: { acceptPendings: agentId },
    }),
  ]).then(() => {
    res.send({ message: 'Cancel request completed' })
  })
}

export const rejectRequest = (req, res, next) => {
  const agentId = req.user._id
  const companyId = req.params.id

  Promise.all([
    Agent.update({ _id: agentId }, {
      $pull: { acceptPendings: companyId },
    }),
    Company.update({ _id: companyId }, {
      $pull: { requestPendings: agentId },
    }),
  ]).then(() => {
    res.send({ message: 'Reject request completed' })
  })
}

export const deleteRelationship = (req, res, next) => {
  const agentId = req.user._id
  const companyId = req.params.id

  Promise.all([
    Company.update({ _id: companyId }, {
      $pull: { agents: agentId },
    }),
    Agent.update({ _id: agentId }, {
      $pull: { companies: companyId },
    }),
  ]).then(() => {
    res.send({ message: 'Delete relationship completed' })
  })
}
