import request from 'supertest'
import app from '../../src/app'

export const agentGetPkgs = token =>
  request(app).get('/agents/pkgs').set('authorization', token)

export const agentEmployeeGetPkgs = token =>
  request(app).get('/agents-employees/pkgs').set('authorization', token)

export const companyGetPkgs = token =>
  request(app).get('/companies/pkgs').set('authorization', token)

export const companyGetPkg = (token, pkgId) =>
  request(app).get(`/companies/pkgs/${pkgId}`).set('authorization', token)

export const companyAddPkg = (token, props) =>
  request(app).post('/companies/pkgs').send(props).set('authorization', token)

export const companyDeletePkg = (token, pkgId) =>
  request(app).delete(`/companies/pkgs/${pkgId}`).set('authorization', token)

export const companyEditPkg = (token, pkgId, props) =>
  request(app)
    .put(`/companies/pkgs/${pkgId}`)
    .set('authorization', token)
    .send(props)

export const companyOfferSpecialPrice = (token, pkgId, props) =>
  request(app)
    .post(`/companies/pkgs/${pkgId}/special-prices`)
    .send(props)
    .set('authorization', token)

export const companyGetSpecialPrices = (token, agentId) =>
  request(app)
    .get(`/companies/special-prices/${agentId}`)
    .set('authorization', token)

export const companyResetSpecialPrice = (token, pkgId, agentId) =>
  request(app)
    .delete(`/companies/pkgs/${pkgId}/special-prices/${agentId}`)
    .set('authorization', token)
