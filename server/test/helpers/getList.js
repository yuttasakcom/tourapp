import request from 'supertest'
import app from '../../src/app'

export const agentGetCompanies = token =>
  request(app).get('/agents/companies').set('authorization', token)

export const agentGetRequestPendings = token =>
  request(app).get('/agents/request-pendings').set('authorization', token)

export const agentGetAcceptPendings = token =>
  request(app).get('/agents/accept-pendings').set('authorization', token)
