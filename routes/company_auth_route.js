const {
  signup,
  signin
} = require('../controllers/company_auth_controller')
const companyPassport = require('../services/company_passport')
const requireCompanySignin = companyPassport.authenticate('local', { session: false })
const router = require('express').Router()

router.post('/signup', signup)
router.post('/signin', requireCompanySignin, signin)

module.exports = router
