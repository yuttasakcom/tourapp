const {
  signup,
  signin,
  profile,
  request,
  accept
} = require('../controllers/agent_controller')
const passport = require('../services/passport')
const requireSignin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })
const router = require('express').Router()
const { hasRole } = require('../middlewares')

router.post('/signup', signup)
router.post('/signin', requireSignin, signin)
router.get('/profile', requireAuth, hasRole('agent'), profile)
router.post('/request', requireAuth, hasRole('agent'), request)
router.post('/accept', requireAuth, hasRole('agent'), accept)

module.exports = router
