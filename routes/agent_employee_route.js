const {
  signin,
  profile
} = require('../controllers/agent_employee_controller')
const router = require('express').Router()

router.post('/signin', signin)
router.get('/profile', profile)

module.exports = router
