const expect = require('chai').expect
const mongoose = require('mongoose')
const Booking = mongoose.model('Booking')

describe.only('Booking model', () => {

  it('add booking', done => {
    const booking1 = new Booking({
      agentId: '41224d776a326fb40f000001',
      employeeId: '41224d776a326fb40f000001',
      companyId: '41224d776a326fb40f000001',
      pkgId: '41224d776a326fb40f000001',
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
