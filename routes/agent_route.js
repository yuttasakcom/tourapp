const c = require('../controllers/agent_controller')
const passport = require('../services/passport')
const requireSignin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })
const router = require('express').Router()
const { hasRole } = require('../middlewares')

router.post('/signup', c.signup)
router.post('/signin', requireSignin, c.signin)
router.get('/profile', requireAuth, hasRole('agent'), c.profile)
router.post('/request', requireAuth, hasRole('agent'), c.request)
router.post('/accept', requireAuth, hasRole('agent'), c.accept)
router.get('/request-pendings', requireAuth, hasRole('agent'), c.getRequestPendingsList)
router.get('/accept-pendings', requireAuth, hasRole('agent'), c.getAcceptPendingsList)
router.delete('/cancel-request/:id', requireAuth, hasRole('agent'), c.cancelRequest)
router.delete('/reject-request/:id', requireAuth, hasRole('agent'), c.rejectRequest)
router.delete('/relationship/:id', requireAuth, hasRole('agent'), c.deleteRelationship)

router.get('/pkgs', requireAuth, hasRole('agent'), c.getPkgsList)
router.get('/companies', requireAuth, hasRole('agent'), c.getCompaniesList)

router.post('/employees', requireAuth, hasRole('agent'), c.addEmployee)

module.exports = router
