const {
  signup,
  signin,
  profile,
  request,
  accept,
  getRequestPendingsList,
  getAcceptPendingsList,
  cancelRequest,
  rejectRequest,
  getPkgsList,
  getCompaniesList,
  deleteRelationship
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
router.get('/request-pendings', requireAuth, hasRole('agent'), getRequestPendingsList)
router.get('/accept-pendings', requireAuth, hasRole('agent'), getAcceptPendingsList)
router.delete('/cancel-request/:id', requireAuth, hasRole('agent'), cancelRequest)
router.delete('/reject-request/:id', requireAuth, hasRole('agent'), rejectRequest)
router.delete('/relationship/:id', requireAuth, hasRole('agent'), deleteRelationship)

router.get('/pkgs', requireAuth, hasRole('agent'), getPkgsList)
router.get('/companies', requireAuth, hasRole('agent'), getCompaniesList)

module.exports = router
