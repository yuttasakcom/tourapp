const expect = require('chai').expect
const mongoose = require('mongoose')
const Pkg = mongoose.model('Pkg')
const { objectId } = require('../../helpers/mock')
const { status } = require('../../helpers/booking')

describe('Pkg model', () => {

  it('add pkg', done => {
    const pkg1 = new Pkg({
      company: objectId,
      name: 'name_test',
      description: 'description_test',
      priceAdult: 3000,
      priceChild: 2000,
      specialPrices: [{
        agent: objectId,
        priceAdult: 2500,
        priceChild: 2000
      }]
    })

    pkg1.save()
      .then(pkg => {

        expect(pkg1.isNew).to.be.false
        done()
      })
      .catch(done)
  })

})
