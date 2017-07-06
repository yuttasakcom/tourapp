const router = require('express').Router()
const passport = require('passport')
const c = require('../controllers/agent_employee')
const { hasRole } = require('../middlewares')

const requireSignin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })

router.post('/signin', requireSignin, c.signin)

router.all('*', requireAuth, hasRole('agentEmployee'))

router.get('/profile', c.getProfile)
router.post('/bookings', c.addBooking)
router.get('/pkgs', c.getPkgsList)

module.exports = router
