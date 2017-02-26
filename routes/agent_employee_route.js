const c = require('../controllers/agent_employee_controller')
const passport = require('../services/passport')
const requireSignin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })
const router = require('express').Router()
const { hasRole } = require('../middlewares')

router.post('/signin', requireSignin, c.signin)
router.get('/profile', requireAuth, hasRole('agentEmployee'), c.profile)
router.post('/bookings', requireAuth, hasRole('agentEmployee'), c.addBooking)
router.get('/pkgs', requireAuth, hasRole('agentEmployee'), c.getPkgsList)

module.exports = router
