const c = require('../controllers/agent_controller')
const passport = require('../services/passport')
const requireSignin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })
const router = require('express').Router()
const { hasRole } = require('../middlewares')

router.post('/signup', c.signup)
router.post('/signin', requireSignin, c.signin)

router.all('*', requireAuth, hasRole('agent'))

router.get('/profile', c.profile)
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

module.exports = router
