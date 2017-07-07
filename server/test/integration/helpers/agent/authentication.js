const request = require('supertest')
const app = require('../../../../src/app')

exports.agentSignIn = props => request(app).post('/agents/signin').send(props)

exports.agentSignUp = props => request(app).post('/agents/signup').send(props)

exports.agentEmployeeSignIn = props =>
  request(app).post('/agents-employees/signin').send(props)

exports.agentAddEmployee = (token, props) =>
  request(app).post('/agents/employees').send(props).set('authorization', token)

exports.agentEmployeeGetProfile = token =>
  request(app).get('/agents-employees/profile').set('authorization', token)

exports.agentGetProfile = token =>
  request(app).get('/agents/profile').set('authorization', token)
