import jwt from 'jwt-simple'
import Company from '../models/company'
import Pkg from '../models/pkg'
import Agent from '../models/agent'
import Booking from '../models/booking'
import { checkEmailExist, hashPassword } from '../helpers/authentication'
import config from '../config'

const tokenForCompany = company => {
  const timestamp = new Date().getTime()
  return jwt.encode({
    _id: company._id,
    sub: company.email,
    role: 'company',
    iat: timestamp,
  }, config.secret)
}

export const updateBooking = (req, res, next) => {
  const bookingId = req.params.id
  const bookingProps = req.body

  Booking
    .update({ _id: bookingId }, {
      $set: bookingProps,
    })
    .then(() => {
      res.send({ message: 'Update booking completed' })
    })
}

export const addPkgSpecialPrice = (req, res, next) => {
  const pkgId = req.params.pkgId
  const specialPriceProps = req.body

  let find = { _id: pkgId, 'specialPrices.agent': specialPriceProps.agent }
  let update = { $set: { 'specialPrices.$': specialPriceProps } }

  Pkg.count(find)
    .then(exist => {
      if (!exist) {
        find = { _id: pkgId }
        update = { $push: { specialPrices: specialPriceProps } }
      }
      Pkg.update(find, update)
        .then(() => {
          res.send({ message: 'Offer special price completed' })
        })
    })
}

export const getBookingsList = (req, res, next) => {
  const companyId = req.user._id

  Booking.find({ company: companyId })
    .populate('agent', 'email')
    .then(bookings => {
      res.send(bookings)
    })
}

export const getAgentsList = (req, res, next) => {
  const companyId = req.user._id

  Company
    .findById(companyId, {
      _id: 0,
      agents: 1,
    })
    .populate('agents')
    .then(company => {
      res.send(company.agents)
    })
    .catch(next)
}

export const signup = (req, res, next) => {
  const companyProps = req.body
  const company = new Company(companyProps)
  const validationErr = company.validateSync()
  if (validationErr) {
    const err = new Error('Must provide email and password')
    err.status = 422
    return next(err)
  }

  return checkEmailExist('Company', company.email)
    .then(exist => {
      if (exist) {
        const err = new Error('Email is in use')
        err.status = 422
        return next(err)
      }
      return hashPassword(company.password)
        .then(hash => {
          company.password = hash
          company.save()
            .then(resCompany =>
              res.status(201).send({ token: tokenForCompany(resCompany) })
            )
            .catch(next)
        })
        .catch(next)
    })
    .catch(next)
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForCompany(req.user) })
}

export const profile = (req, res, next) => {
  res.send({ message: 'realy secret' })
}

export const addPkg = (req, res, next) => {
  const companyId = req.user._id
  req.body.company = companyId
  const pkgProps = req.body

  Pkg.create(pkgProps)
    .then(pkg => {
      res.status(201).send(pkg)
    })
}

export const getPkg = (req, res, next) => {
  const pkgId = req.params.id

  Pkg.findById(pkgId)
    .then(pkg => {
      res.send(pkg)
    })
    .catch(next)
}

export const deletePkg = (req, res, next) => {
  const pkgId = req.params.id

  Pkg.remove({ _id: pkgId })
    .then(() => {
      res.send({ message: 'Delete package completed' })
    })
}

export const updatePkg = (req, res, next) => {
  const pkgId = req.params.id
  const pkgProps = req.body

  Pkg
    .findByIdAndUpdate(pkgId, {
      $set: pkgProps,
    }, {
      new: true,
    })
    .then(pkg => {
      res.send(pkg)
    })
    .catch(next)
}

export const getPkgsList = (req, res, next) => {
  const companyId = req.user._id

  Pkg.find({ company: companyId })
    .then(pkgs => {
      res.set('Content-Range', pkgs.length)
      res.send(pkgs)
    })
}

export const request = (req, res, next) => {
  const agentId = req.body._id
  const companyId = req.user._id

  Company
    .count({
      _id: companyId,
      agents: agentId,
    })
    .then(exist => {
      if (exist) {
        const err = new Error('This agent is already member')
        err.status = 422
        return next(err)
      }

      return Company
        .update({ _id: companyId }, {
          $addToSet: { requestPendings: agentId },
        })
        .then(({ nModified }) => {
          if (nModified) {
            return Agent
              .update({ _id: agentId }, {
                $addToSet: { acceptPendings: companyId },
              })
              .then(() => res.send({ message: 'Send request completed' }))
              .catch(next)
          }
          const err = new Error('This agent is already request')
          err.status = 422
          return next(err)
        })
        .catch(next)
    })
    .catch(next)
}

export const accept = (req, res, next) => {
  const agentId = req.body._id
  const companyId = req.user._id

  Company
    .update({ _id: companyId }, {
      $pull: { acceptPendings: agentId },
    })
    .then(({ nModified }) => {
      if (nModified) {
        Agent
          .update({ _id: agentId }, {
            $pull: { requestPendings: companyId },
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
  const companyId = req.user._id

  Company.findById(companyId, { _id: 0, requestPendings: 1 })
    .then(requestPendings => {
      res.send(requestPendings)
    })
}

export const getAcceptPendingsList = (req, res, next) => {
  const companyId = req.user._id

  Company.findById(companyId, { _id: 0, acceptPendings: 1 })
    .then(acceptPendings => {
      res.send(acceptPendings)
    })
}

export const cancelRequest = (req, res, next) => {
  const companyId = req.user._id
  const agentId = req.params.id

  Promise.all([
    Company.update({ _id: companyId }, {
      $pull: { requestPendings: agentId },
    }),
    Agent.update({ _id: agentId }, {
      $pull: { acceptPendings: companyId },
    }),
  ]).then(() => {
    res.send({ message: 'Cancel request completed' })
  })
}

export const deleteRelationship = (req, res, next) => {
  const companyId = req.user._id
  const agentId = req.params.id

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

export const rejectRequest = (req, res, next) => {
  const companyId = req.user._id
  const agentId = req.params.id

  Promise.all([
    Company.update({ _id: companyId }, {
      $pull: { acceptPendings: agentId },
    }),
    Agent.update({ _id: agentId }, {
      $pull: { requestPendings: companyId },
    }),
  ]).then(() => {
    res.send({ message: 'Reject request completed' })
  })
}
