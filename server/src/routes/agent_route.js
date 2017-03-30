import express from 'express'
import passport from 'passport'
import * as c from '../controllers/agent'
import { hasRole } from '../middlewares'

const requireSignin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })
const router = express.Router()

router.post('/signup', c.signup)
router.post('/signin', requireSignin, c.signin)

router.all('*', requireAuth, hasRole('agent'))

router.get('/profile', c.getProfile)
router.post('/request', c.request)
router.post('/accept', c.accept)
router.get('/request-pendings', c.getRequestPendingsList)
router.get('/accept-pendings', c.getAcceptPendingsList)
router.delete('/cancel-request/:id', c.cancelRequest)
router.delete('/reject-request/:id', c.rejectRequest)
router.delete('/relationship/:id', c.deleteRelationship)
router.get('/pkgs', c.getPkgsList)
router.get('/companies', c.getCompaniesList)
router.post('/employees', c.addEmployee)
router.post('/bookings', c.addBooking)

export default router
