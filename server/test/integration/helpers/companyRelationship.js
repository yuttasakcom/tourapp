const request = require('supertest')
const app = require('../../../src/app')

exports.companyRequest = (token, { _id }) =>
  request(app)
    .post('/companies/request')
    .send({ _id })
    .set('authorization', token)

exports.companyAccept = (token, { _id }) =>
  request(app)
    .post('/companies/accept')
    .send({ _id })
    .set('authorization', token)

exports.companyDeleteRelationship = (token, { _id }) =>
  request(app)
    .delete(`/companies/relationship/${_id}`)
    .set('authorization', token)

exports.companyCancelRequest = (token, { _id }) =>
  request(app)
    .delete(`/companies/cancel-request/${_id}`)
    .set('authorization', token)

exports.companyRejectRequest = (token, { _id }) =>
  request(app)
    .delete(`/companies/reject-request/${_id}`)
    .set('authorization', token)

exports.companyGetAgents = token =>
  request(app).get('/companies/agents').set('authorization', token)

exports.companyGetRequestPendings = token =>
  request(app).get('/companies/request-pendings').set('authorization', token)

exports.companyGetAcceptPendings = token =>
  request(app).get('/companies/accept-pendings').set('authorization', token)
