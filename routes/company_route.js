const {
  signup,
  signin,
  profile
} = require('../controllers/company_controller')
const passport = require('../services/passport')
const requireSignin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })
const router = require('express').Router()

const onlyCompany = (req, res, next) => {
  const role = req.user.role
  if (role === 'company') {
    return next()
  }
  let err = new Error('Unauthorized')
  err.status = 401
  return next(err)
}

router.post('/signup', signup)
router.post('/signin', requireSignin, signin)
router.get('/profile', requireAuth, onlyCompany, profile)

module.exports = router
