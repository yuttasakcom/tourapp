const {
  signup,
  signin,
  profile,
  addPkg,
  getPkgsList,
  getPkg,
  deletePkg,
  updatePkg,
  request,
  accept,
  getRequestPendingsList,
  getAcceptPendingsList,
  cancelRequest,
  rejectRequest,
  getAgentsList,
  deleteRelationship
} = require('../controllers/company_controller')
const passport = require('../services/passport')
const requireSignin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })
const router = require('express').Router()
const { hasRole } = require('../middlewares')

router.post('/signup', signup)
router.post('/signin', requireSignin, signin)
router.get('/profile', requireAuth, hasRole('company'), profile)
router.post('/pkgs', requireAuth, hasRole('company'), addPkg)
router.get('/pkgs', requireAuth, hasRole('company'), getPkgsList)
router.get('/pkgs/:id', requireAuth, hasRole('company'), getPkg)
router.delete('/pkgs/:id', requireAuth, hasRole('company'), deletePkg)
router.put('/pkgs/:id', requireAuth, hasRole('company'), updatePkg)
router.post('/request', requireAuth, hasRole('company'), request)
router.post('/accept', requireAuth, hasRole('company'), accept)
router.get('/request-pendings', requireAuth, hasRole('company'), getRequestPendingsList)
router.get('/accept-pendings', requireAuth, hasRole('company'), getAcceptPendingsList)
router.delete('/cancel-request', requireAuth, hasRole('company'), cancelRequest)
router.delete('/reject-request', requireAuth, hasRole('company'), rejectRequest)
router.get('/agents', requireAuth, hasRole('company'), getAgentsList)
router.delete('/relationship/:id', requireAuth, hasRole('company'), deleteRelationship)

module.exports = router
