const passport = require('passport')
const LocalStrategy = require('passport-local-roles')
const passportJwt = require('passport-jwt')
const mongoose = require('mongoose')

const config = require('../config')
const { comparePassword } = require('../helpers/authentication')

const Company = mongoose.model('Company')
const Agent = mongoose.model('Agent')
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

const localLogin = new LocalStrategy(
  {
    usernameField: 'email',
    roleField: 'role',
    session: false
  },
  async (email, password, role, done) => {
    switch (role) {
      case 'company':
      case 'agent':
        try {
          const user = await userCollection(role).findOne(
            { email },
            {
              password: 1,
              email: 1
            }
          )

          if (!user) return done(null, false)

          const isMatch = await comparePassword(password, user.password)
          if (!isMatch) return done(null, false)

          return done(null, user)
        } catch (e) {
          return done(e)
        }
      case 'agentEmployee': {
        const emails = email.split('..')
        const agentEmail = emails[0]
        const employeeEmail = emails[1]

        try {
          const agent = await userCollection(role).findOne(
            { email: agentEmail },
            {
              employees: {
                $elemMatch: {
                  email: employeeEmail
                }
              },
              email: 1
            }
          )
          const user = agent.employees[0]
          if (!user) return done(null, false)

          const isMatch = await comparePassword(password, user.password)
          if (!isMatch) return done(null, false)

          return done(null, agent)
        } catch (e) {
          return done(e)
        }
      }
      default:
        return done(null, false)
    }
  }
)

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  done(null, payload)
})

passport.use(jwtLogin)
passport.use(localLogin)
