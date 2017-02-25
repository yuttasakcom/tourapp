const {
  signin,
  profile,
  addBooking
} = require('../controllers/agent_employee_controller')
const passport = require('../services/passport')
const requireSignin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })
const router = require('express').Router()
const { hasRole } = require('../middlewares')

router.post('/signin', requireSignin, signin)
router.get('/profile', requireAuth, hasRole('agentEmployee'), profile)
router.post('/bookings', requireAuth, hasRole('agentEmployee'), addBooking)

module.exports = router
