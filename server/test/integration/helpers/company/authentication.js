const request = require('supertest')
const app = require('../../../../src/app')

exports.companySignIn = props =>
  request(app).post('/companies/signin').send(props)

exports.companySignUp = props =>
  request(app).post('/companies/signup').send(props)

exports.companyGetProfile = token =>
  request(app).get('/companies/profile').set('authorization', token)
