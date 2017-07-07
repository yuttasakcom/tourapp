const request = require('supertest')
const app = require('../../../../src/app')

exports.companyGetPkgs = token =>
  request(app).get('/companies/pkgs').set('authorization', token)

exports.companyGetPkg = (token, pkgId) =>
  request(app).get(`/companies/pkgs/${pkgId}`).set('authorization', token)

exports.companyAddPkg = (token, props) =>
  request(app).post('/companies/pkgs').send(props).set('authorization', token)

exports.companyDeletePkg = (token, pkgId) =>
  request(app).delete(`/companies/pkgs/${pkgId}`).set('authorization', token)

exports.companyEditPkg = (token, pkgId, props) =>
  request(app)
    .put(`/companies/pkgs/${pkgId}`)
    .set('authorization', token)
    .send(props)

exports.companyOfferSpecialPrice = (token, pkgId, props) =>
  request(app)
    .post(`/companies/pkgs/${pkgId}/special-prices`)
    .send(props)
    .set('authorization', token)

exports.companyGetSpecialPrices = (token, agentId) =>
  request(app)
    .get(`/companies/special-prices/${agentId}`)
    .set('authorization', token)

exports.companyResetSpecialPrice = (token, pkgId, agentId) =>
  request(app)
    .delete(`/companies/pkgs/${pkgId}/special-prices/${agentId}`)
    .set('authorization', token)
