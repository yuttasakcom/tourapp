const { signin } = require('../controllers/agent_employee_controller')
const router = require('express').Router()

router.post('/signin', signin)

module.exports = router