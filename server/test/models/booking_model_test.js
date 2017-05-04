import mongoose from 'mongoose'
import { expect } from 'chai'

const Booking = mongoose.model('Booking')
const { objectId } = require('../../src/helpers/mock')
const { status } = require('../../src/helpers/booking')

describe('Booking model', () => {
  it('add booking', done => {
    const booking1 = new Booking({
      agent: objectId,
      employee: objectId,
      company: objectId,
      pkg: {
        _id: objectId,
        name: 'name_test',
        priceAdult: 2000,
        priceChild: 1000,
      },
      tourist: {
        name: 'Paiboon',
        phoneNumber: '024283192',
        hotel: 'clusterkit hotel',
        adult: 3,
        child: 1,
        nationality: 'thai',
        date: new Date(),
        note: 'awesome trip',
      },
    })

    booking1.save()
      .then(booking => {
        expect(booking1.isNew).to.equal(false)
        expect(booking.status).to.equal(status.waiting)
        expect(booking.pkg.priceAdult).to.equal(2000)
        done()
      })
      .catch(done)
  })
})