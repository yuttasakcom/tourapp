const passport = require('passport')
const Agent = require('../models/agent')
const config = require('../config')
const LocalStrategy = require('passport-local')

const localLogin = new LocalStrategy({
  usernameField: 'email'
}, function(email, password, done) {
  Agent.findOne({ email: email })
  	.then(agent => {
  		if (!agent) return done(null, false)

  		agent.comparePassword(password)
  			.then(isMatch => {
  				if (!isMatch) return done(null, false)

  				return done(null, agent)
  			})
  			.catch(done)

  	})
  	.catch(done)
})

passport.use(localLogin)

module.exports = passport
