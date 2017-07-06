const router = require('express').Router()
const passport = require('passport')
const c = require('../controllers/company')
const { hasRole } = require('../middlewares')

const requireSignin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })

router.post('/signup', c.signup)
router.post('/signin', requireSignin, c.signin)

router.all('*', requireAuth, hasRole('company'))

router.get('/profile', c.getProfile)
router.post('/pkgs', c.addPkg)
router.get('/pkgs', c.getPkgsList)
router.get('/pkgs/:id', c.getPkg)
router.delete('/pkgs/:id', c.deletePkg)
router.put('/pkgs/:id', c.updatePkg)
router.post('/request', c.request)
router.post('/accept', c.accept)
router.get('/request-pendings', c.getRequestPendingsList)
router.get('/accept-pendings', c.getAcceptPendingsList)
router.delete('/cancel-request/:id', c.cancelRequest)
router.delete('/reject-request/:id', c.rejectRequest)
router.get('/agents', c.getAgentsList)
router.delete('/relationship/:id', c.deleteRelationship)
router.get('/bookings', c.getBookingsList)
router.post('/pkgs/:pkgId/special-prices', c.addPkgSpecialPrice)
router.delete('/pkgs/:pkgId/special-prices/:agentId', c.deletePkgSpecialPrice)
router.get('/special-prices/:agentId', c.getSpecialPricesList)
router.put('/bookings/:id', c.updateBooking)

module.exports = router
