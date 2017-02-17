const {
  signup
} = require('../controllers/agent_controller')
const router = require('express').Router()

router.post('/signup', signup)

module.exports = router