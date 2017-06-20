import request from 'supertest'
import app from '../../src/app'

export const companyRequest = (token, { _id }) =>
  request(app)
    .post('/companies/request')
    .send({ _id })
    .set('authorization', token)

export const companyAccept = (token, { _id }) =>
  request(app)
    .post('/companies/accept')
    .send({ _id })
    .set('authorization', token)

export const companyDeleteRelationship = (token, { _id }) =>
  request(app)
    .delete(`/companies/relationship/${_id}`)
    .set('authorization', token)

export const companyCancelRequest = (token, { _id }) =>
  request(app)
    .delete(`/companies/cancel-request/${_id}`)
    .set('authorization', token)

export const companyRejectRequest = (token, { _id }) =>
  request(app)
    .delete(`/companies/reject-request/${_id}`)
    .set('authorization', token)

export const companyGetAgents = token =>
  request(app).get('/companies/agents').set('authorization', token)

export const companyGetRequestPendings = token =>
  request(app).get('/companies/request-pendings').set('authorization', token)

export const companyGetAcceptPendings = token =>
  request(app).get('/companies/accept-pendings').set('authorization', token)
