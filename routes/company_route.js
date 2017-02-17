const {
  signup,
  signin,
  profile
} = require('../controllers/company_controller')
const passport = require('../services/passport')
const requireSignin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })
const router = require('express').Router()

router.post('/signup', signup)
router.post('/signin', requireSignin, signin)
router.get('/profile', requireAuth, profile)

module.exports = router
