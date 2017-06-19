import request from 'supertest'
import app from '../../src/app'

export const agentSignIn = props =>
  request(app).post('/agents/signin').send(props)

export const companySignIn = props =>
  request(app).post('/companies/signin').send(props)
