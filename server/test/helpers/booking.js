import request from 'supertest'
import app from '../../src/app'

export const agentAddBooking = (token, props) =>
  request(app).post('/agents/bookings').send(props).set('authorization', token)

export const agentEmployeeAddBooking = (token, props) =>
  request(app)
    .post('/agents-employees/bookings')
    .send(props)
    .set('authorization', token)

export const companyGetBookings = token =>
  request(app).get('/companies/bookings').set('authorization', token)

export const companyUpdateBookingStatus = (token, bookingId, status) =>
  request(app)
    .put(`/companies/bookings/${bookingId}`)
    .send({ status })
    .set('authorization', token)
