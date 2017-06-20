import mongoose from 'mongoose'
import { expect } from 'chai'
import { objectId } from '../helpers'

const Pkg = mongoose.model('Pkg')

describe('Pkg model', () => {
  it('add pkg', async () => {
    const pkg1 = new Pkg({
      company: objectId,
      name: 'name_test',
      description: 'description_test',
      priceAdult: 3000,
      priceChild: 2000,
      specialPrices: [
        {
          agent: objectId,
          priceAdult: 2500,
          priceChild: 2000
        }
      ]
    })

    await pkg1.save()
    expect(pkg1.isNew).to.equal(false)
  })
})
