const passport = require('passport')
const Company = require('../models/company')
const Agent = require('../models/agent')
const config = require('../config')
const LocalStrategy = require('passport-local-roles')
const passportJwt = require('passport-jwt')
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt
const { comparePassword } = require('../helpers/authentication')

const localLogin = new LocalStrategy({
  usernameField: 'email',
  roleField: 'role',
  session: false
}, function(email, password, role, done) {

  const userCollection = (role) => {
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

  switch (role) {
    case 'company':
    case 'agent':
      userCollection(role).findOne({ email: email }, {
          password: 1,
          email: 1
        })
        .then(user => {
          if (!user) return done(null, false)

          comparePassword(password, user.password)
            .then(isMatch => {
              if (!isMatch) return done(null, false)

              return done(null, user)
            })
            .catch(done)

        })
        .catch(done)
      break
    case 'agentEmployee':
      const emails = email.split('..')
      const agentEmail = emails[0]
      const employeeEmail = emails[1]

      userCollection(role).findOne({ email: agentEmail }, {
          employees: {
            $elemMatch: {
              email: employeeEmail
            }
          },
          email: 1
        })
        .then(agent => {
          const user = agent.employees[0]

          if (!user) return done(null, false)

          comparePassword(password, user.password)
            .then(isMatch => {
              if (!isMatch) return done(null, false)

              return done(null, agent)
            })
            .catch(done)
        })
        .catch(done)
      break
    default:
      break
  }
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  done(null, payload)
})

passport.use(jwtLogin)
passport.use(localLogin)

module.exports = passport
