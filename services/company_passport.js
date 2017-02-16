const passport = require('passport')
const Company = require('../models/company')
const config = require('../config')
const LocalStrategy = require('passport-local')

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

passport.use(localLogin)

module.exports = passport
