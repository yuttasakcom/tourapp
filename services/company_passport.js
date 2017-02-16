const passport = require('passport')
const Company = require('../models/company')
const config = require('../config')
const LocalStrategy = require('passport-local')
const passportJwt = require('passport-jwt')
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

const localLogin = new LocalStrategy({
  usernameField: 'email'
}, function(email, password, done) {
  Company.findOne({ email: email })
  	.then(company => {
  		if (!company) return done(null, false)

  		company.comparePassword(password)
  			.then(isMatch => {
  				if (!isMatch) return done(null, false)

  				return done(null, company)
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
