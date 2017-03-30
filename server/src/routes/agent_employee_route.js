import express from 'express'
import passport from 'passport'
import * as c from '../controllers/agent_employee'
import { hasRole } from '../middlewares'

const requireSignin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })
const router = express.Router()
router.post('/signin', requireSignin, c.signin)

router.all('*', requireAuth, hasRole('agentEmployee'))

router.get('/profile', c.getProfile)
router.post('/bookings', c.addBooking)
router.get('/pkgs', c.getPkgsList)

export default router
