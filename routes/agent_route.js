const {
  signup,
  signin
} = require('../controllers/agent_controller')
const agentPassport = require('../services/agent_passport')
const requireAgentSignin = agentPassport.authenticate('local', { session: false })
const router = require('express').Router()

router.post('/signup', signup)
router.post('/signin', requireAgentSignin, signin)

module.exports = router
