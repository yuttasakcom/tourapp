import jwt from 'jwt-simple'
import Booking from '../models/booking'
import Agent from '../models/agent'
import Pkg from '../models/pkg'
import config from '../config'

const tokenForAgentEmployee = agent => {
  const timestamp = new Date().getTime()
  const employee = agent.employees[0]

  return jwt.encode({
    _id: employee._id,
    agentId: agent._id,
    sub: employee.email,
    role: 'agentEmployee',
    iat: timestamp,
  }, config.secret)
}

export const getPkgsList = (req, res, next) => {
  const agentId = req.user.agentId

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

export const addBooking = (req, res, next) => {
  const user = req.user
  const bookingProps = req.body

  Agent
    .count({
      _id: user.agentId,
      companies: bookingProps.company,
    })
    .then(exist => {
      if (!exist) {
        const err = new Error('This company is not member')
        err.status = 401
        return next(err)
      }

      bookingProps.agent = user.agentId
      bookingProps.employee = user._id

      return Booking.create(bookingProps)
        .then(booking => {
          res.send(booking)
        })
    })
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForAgentEmployee(req.user) })
}

export const profile = (req, res, next) => {
  res.send({ message: 'realy secret' })
}
