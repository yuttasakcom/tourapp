import { expect } from 'chai'
import mongoose from 'mongoose'
import * as h from '../../helpers'
import { status } from '../../../src/helpers/booking'

const Booking = mongoose.model('Booking')
const Company = mongoose.model('Company')
const Agent = mongoose.model('Agent')

describe('Get Bookings', () => {
  let company1
  let company1Token

  const company1Props = {
    email: 'company1@test.com',
    password: '1234'
  }

  const touristProps = {
    name: 'Paiboon',
    phoneNumber: '024283192',
    hotel: 'clusterkit hotel',
    adult: 3,
    child: 1,
    nationality: 'thai',
    date: new Date(),
    note: 'awesome trip'
  }

  beforeEach(async () => {
    const agent1 = new Agent({
      email: 'agent1stub@test.com',
      password: h.password.hash
    })
    const res = await h.companySignUp(company1Props)
    company1 = await Company.findOne({ email: company1Props.email })
    company1Token = res.body.token

    const bookingsStubs = new Array(10).fill(undefined).map(() => ({
      company: company1._id,
      tourist: touristProps,
      agent: agent1
    }))

    await Promise.all([Booking.insertMany(bookingsStubs), agent1.save()])
  })

  it('Company get bookings list', async () => {
    const res = await h.companyGetBookings(company1Token).expect(200)
    expect(res.body.length).to.equal(10)
  })
})
