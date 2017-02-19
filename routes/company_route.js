const {
  signup,
  signin,
  profile,
  addRelationship,
  addPackage
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
router.post('/packages', requireAuth, hasRole('company'), addPackage)

module.exports = router
