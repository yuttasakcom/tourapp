const request = require('supertest')
const app = require('../../../../src/app')

exports.agentAddBooking = (token, props) =>
  request(app).post('/agents/bookings').send(props).set('authorization', token)

exports.agentEmployeeAddBooking = (token, props) =>
  request(app)
    .post('/agents-employees/bookings')
    .send(props)
    .set('authorization', token)

exports.agentGetBookings = token =>
  request(app).get('/agents/bookings').set('authorization', token)
