const {
  signup,
  signin,
  profile,
  addRelationship,
  addPkg,
  request,
  accept,
  getRequestPendingsList,
  getAcceptPendingsList,
  cancelRequest
} = require('../controllers/company_controller')
const passport = require('../services/passport')
const requireSignin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })
const router = require('express').Router()
const { hasRole } = require('../middlewares')

router.post('/signup', signup)
router.post('/signin', requireSignin, signin)
router.get('/profile', requireAuth, hasRole('company'), profile)
router.post('/agents', requireAuth, hasRole('company'), addRelationship)
router.post('/pkgs', requireAuth, hasRole('company'), addPkg)
router.post('/request', requireAuth, hasRole('company'), request)
router.post('/accept', requireAuth, hasRole('company'), accept)
router.get('/request-pendings', requireAuth, hasRole('company'), getRequestPendingsList)
router.get('/accept-pendings', requireAuth, hasRole('company'), getAcceptPendingsList)
router.post('/cancel-request', requireAuth, hasRole('company'), cancelRequest)

module.exports = router
