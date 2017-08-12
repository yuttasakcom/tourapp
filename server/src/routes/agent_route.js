const router = require('express').Router()
const passport = require('passport')
const c = require('../controllers/agent')
const r = require('../reports/agent')
const { hasRole } = require('../middlewares')

const requireSignin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })

router.post('/signup', c.signup)
router.post('/signin', requireSignin, c.signin)

router.all('*', requireAuth, hasRole('agent'))

router.get('/profile', c.getProfile)
router.post('/request', c.request)
router.post('/accept', c.accept)
router.get('/request-pendings', c.getRequestPendingsList)
router.get('/accept-pendings', c.getAcceptPendingsList)
router.delete('/cancel-request/:id', c.cancelRequest)
router.delete('/reject-request/:id', c.rejectRequest)
router.delete('/relationship/:id', c.deleteRelationship)
router.get('/pkgs', c.getPkgsList)
router.get('/companies', c.getCompaniesList)
router.post('/employees', c.addEmployee)
router.post('/bookings', c.addBooking)
router.get('/bookings', c.getBookingsList)
router.get('/dashboard', c.getDashboard)
router.get('/hotels', c.getHotelsList)
router.get('/reports/voucher', r.voucher)

module.exports = router
