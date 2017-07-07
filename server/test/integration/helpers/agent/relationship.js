const request = require('supertest')
const app = require('../../../../src/app')

exports.agentRequest = (token, { _id }) =>
  request(app).post('/agents/request').send({ _id }).set('authorization', token)

exports.agentCancelRequest = (token, { _id }) =>
  request(app)
    .delete(`/agents/cancel-request/${_id}`)
    .set('authorization', token)

exports.agentAccept = (token, { _id }) =>
  request(app).post('/agents/accept').send({ _id }).set('authorization', token)

exports.agentDeleteRelationship = (token, { _id }) =>
  request(app).delete(`/agents/relationship/${_id}`).set('authorization', token)

exports.agentRejectRequest = (token, { _id }) =>
  request(app)
    .delete(`/agents/reject-request/${_id}`)
    .set('authorization', token)

exports.agentGetRequestPendings = token =>
  request(app).get('/agents/request-pendings').set('authorization', token)

exports.agentGetAcceptPendings = token =>
  request(app).get('/agents/accept-pendings').set('authorization', token)

exports.agentGetCompanies = token =>
  request(app).get('/agents/companies').set('authorization', token)
