const {
  signup,
  signin,
  profile
} = require('../controllers/company_controller')
const companyPassport = require('../services/company_passport')
const requireCompanySignin = companyPassport.authenticate('local', { session: false })
const router = require('express').Router()

router.post('/signup', signup)
router.post('/signin', requireCompanySignin, signin)
router.get('/profile', profile)

module.exports = router
