const expect = require('chai').expect
const mongoose = require('mongoose')
const Booking = mongoose.model('Booking')
const { objectId } = require('../../helpers/mock')

describe('Booking model', () => {

  it('add booking', done => {
    const booking1 = new Booking({
      agentId: objectId,
      employeeId: objectId,
      companyId: objectId,
      pkgId: objectId,
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

    booking1.save()
      .then(booking => {

        expect(booking1.isNew).to.be.false
        done()
      })
      .catch(done)
  })

})
