const passport = require('passport')
const Company = require('../models/company')
const Agent = require('../models/agent')
const config = require('../config')
const LocalStrategy = require('passport-local-roles')
const passportJwt = require('passport-jwt')
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

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
        return Agent
      default:
        return Agent
    }
  }

  userCollection(role).findOne({ email: email }, {
      password: 1,
      email: 1
    })
    .then(user => {
      if (!user) return done(null, false)

      user.comparePassword(password)
        .then(isMatch => {
          if (!isMatch) return done(null, false)

          return done(null, user)
        })
        .catch(done)

    })
    .catch(done)
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
