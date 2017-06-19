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

export const agentAccept = (token, { _id }) =>
  request(app).post('/agents/accept').send({ _id }).set('authorization', token)

export const agentDeleteRelationship = (token, { _id }) =>
  request(app).delete(`/agents/relationship/${_id}`).set('authorization', token)

export const agentRequest = (token, { _id }) =>
  request(app).post('/agents/request').send({ _id }).set('authorization', token)

export const agentCancelRequest = (token, { _id }) =>
  request(app)
    .delete(`/agents/cancel-request/${_id}`)
    .set('authorization', token)

export const agentRejectRequest = (token, { _id }) =>
  request(app)
    .delete(`/agents/reject-request/${_id}`)
    .set('authorization', token)
