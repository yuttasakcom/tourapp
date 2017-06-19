import request from 'supertest'

import app from '../../src/app'

export const companyRequest = (token, { _id }) =>
  request(app)
    .post('/companies/request')
    .send({ _id })
    .set('authorization', token)

export const agentAccept = (token, { _id }) =>
  request(app).post('/agents/accept').send({ _id }).set('authorization', token)
