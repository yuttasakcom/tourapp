const c = require('../controllers/agent_employee_controller')
const passport = require('passport')
const requireSignin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })
const router = require('express').Router()
const { hasRole } = require('../middlewares')

router.post('/signin', requireSignin, c.signin)

router.all('*', requireAuth, hasRole('agentEmployee'))

router.get('/profile', c.profile)
router.post('/bookings', c.addBooking)
router.get('/pkgs', c.getPkgsList)

module.exports = router
