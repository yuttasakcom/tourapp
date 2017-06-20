import mongoose from 'mongoose'
import { expect } from 'chai'

const Booking = mongoose.model('Booking')
const { objectId } = require('../helpers')
const { status } = require('../../src/helpers/booking')

describe('Booking model', () => {
  it('add booking', async () => {
    const booking1 = new Booking({
      agent: objectId,
      employee: objectId,
      company: objectId,
      pkg: {
        _id: objectId,
        name: 'name_test',
        priceAdult: 2000,
        priceChild: 1000
      },
      tourist: {
        name: 'Paiboon',
        phoneNumber: '024283192',
        hotel: 'clusterkit hotel',
        adult: 3,
        child: 1,
        nationality: 'thai',
        date: new Date(),
        note: 'awesome trip'
      }
    })

    const booking = await booking1.save()
    expect(booking1.isNew).to.equal(false)
    expect(booking.status).to.equal(status.waiting)
    expect(booking.pkg.priceAdult).to.equal(2000)
  })
})
