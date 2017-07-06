const request = require('supertest')
const app = require('../../src/app')

exports.agentAddBooking = (token, props) =>
  request(app).post('/agents/bookings').send(props).set('authorization', token)

exports.agentEmployeeAddBooking = (token, props) =>
  request(app)
    .post('/agents-employees/bookings')
    .send(props)
    .set('authorization', token)

exports.companyGetBookings = token =>
  request(app).get('/companies/bookings').set('authorization', token)

exports.agentGetBookings = token =>
  request(app).get('/agents/bookings').set('authorization', token)

exports.companyUpdateBookingStatus = (token, bookingId, status) =>
  request(app)
    .put(`/companies/bookings/${bookingId}`)
    .send({ status })
    .set('authorization', token)
