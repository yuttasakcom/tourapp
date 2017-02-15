const { signup } = require('../controllers/company_auth_controller')
const router = require('express').Router()

router.get('/signup', signup)

module.exports = router