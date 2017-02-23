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
  getPkgsList
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
router.delete('/cancel-request', requireAuth, hasRole('agent'), cancelRequest)
router.delete('/reject-request', requireAuth, hasRole('agent'), rejectRequest)

router.get('/pkgs', requireAuth, hasRole('agent'), getPkgsList)

module.exports = router
