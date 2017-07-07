const request = require('supertest')
const app = require('../../../../src/app')

exports.agentGetPkgs = token =>
  request(app).get('/agents/pkgs').set('authorization', token)

exports.agentEmployeeGetPkgs = token =>
  request(app).get('/agents-employees/pkgs').set('authorization', token)
