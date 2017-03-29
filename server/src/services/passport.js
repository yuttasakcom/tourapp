const passport = require('passport')
const Company = require('../models/company')
const Agent = require('../models/agent')
const config = require('../config')
const LocalStrategy = require('passport-local-roles')
const passportJwt = require('passport-jwt')
const { comparePassword } = require('../helpers/authentication')

const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

const userCollection = role => {
  switch (role) {
    case 'company':
      return Company
    case 'agent':
    case 'agentEmployee':
      return Agent
    default:
      return Agent
  }
}

const localLogin = new LocalStrategy({
  usernameField: 'email',
  roleField: 'role',
  session: false,
}, (email, password, role, done) => {
  switch (role) {
    case 'company':
    case 'agent':
      userCollection(role)
        .findOne({ email }, {
          password: 1,
          email: 1,
        })
        .then(user => {
          if (!user) return done(null, false)

          return comparePassword(password, user.password)
            .then(isMatch => {
              if (!isMatch) return done(null, false)

              return done(null, user)
            })
            .catch(done)
        })
        .catch(done)
      break
    case 'agentEmployee':
      {
        const emails = email.split('..')
        const agentEmail = emails[0]
        const employeeEmail = emails[1]

        userCollection(role)
        .findOne({ email: agentEmail }, {
          employees: {
            $elemMatch: {
              email: employeeEmail,
            },
          },
          email: 1,
        })
        .then(agent => {
          const user = agent.employees[0]
          if (!user) return done(null, false)

          return comparePassword(password, user.password)
            .then(isMatch => {
              if (!isMatch) return done(null, false)

              return done(null, agent)
            })
            .catch(done)
        })
        .catch(done)
        break
      }
    default:
      done(null, false)
      break
  }
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
}

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  done(null, payload)
})

passport.use(jwtLogin)
passport.use(localLogin)

module.exports = passport
