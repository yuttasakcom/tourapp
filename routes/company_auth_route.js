const {
  signup,
  signin
} = require('../controllers/company_auth_controller')
const router = require('express').Router()

router.post('/signup', signup)
router.post('/signin', signin)

module.exports = router
