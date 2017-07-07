const request = require('supertest')
const app = require('../../../../src/app')

exports.companyGetBookings = token =>
  request(app).get('/companies/bookings').set('authorization', token)

exports.companyUpdateBookingStatus = (token, bookingId, status) =>
  request(app)
    .put(`/companies/bookings/${bookingId}`)
    .send({ status })
    .set('authorization', token)
