import request from 'supertest'
import app from '../../src/app'

export const agentSignIn = props =>
  request(app).post('/agents/signin').send(props)

export const agentSignUp = props =>
  request(app).post('/agents/signup').send(props)

export const companySignIn = props =>
  request(app).post('/companies/signin').send(props)

export const companySignUp = props =>
  request(app).post('/companies/signup').send(props)

export const agentEmployeeSignIn = props =>
  request(app).post('/agents-employees/signin').send(props)

export const companyGetProfile = token =>
  request(app).get('/companies/profile').set('authorization', token)

export const agentAddEmployee = (token, props) =>
  request(app).post('/agents/employees').send(props).set('authorization', token)

export const agentEmployeeGetProfile = token =>
  request(app).get('/agents-employees/profile').set('authorization', token)

export const agentGetProfile = token =>
  request(app).get('/agents/profile').set('authorization', token)
