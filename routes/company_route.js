const {
  signup,
  signin,
  profile,
  addRelationship
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

module.exports = router
