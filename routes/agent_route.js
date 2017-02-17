const {
  signup,
  signin
} = require('../controllers/agent_controller')
const passport = require('../services/passport')
const requireSignin = passport.authenticate('local', { session: false })
const router = require('express').Router()

router.post('/signup', signup)
router.post('/signin', requireSignin, signin)

module.exports = router
