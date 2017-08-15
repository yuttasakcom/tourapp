const mongoose = require('mongoose')
const { expect } = require('chai')

const Company = mongoose.model('Company')
const Hotel = mongoose.model('Hotel')

describe.only('Bus Path model', () => {
  let company1
  let company2
  let hotel1
  let hotel2

  beforeEach(async () => {
    hotel1 = new Hotel({
      name: 'hotel1'
    })

    hotel2 = new Hotel({
      name: 'hotel2'
    })

    company1 = new Company({
      email: 'company1@test.com',
      name: 'company1',
      password: '1234',
      address: 'address',
      phoneNumber: 'phone number',
      adminName: 'admin name',
      adminPhoneNumber: 'admin phone number',
      busPaths: [
        {
          name: 'name1',
          description: 'des1',
          hotels: [hotel1._id, hotel2._id]
        },
        { name: 'name2', description: 'des2', hotels: [hotel1._id, hotel2._id] }
      ]
    })

    company2 = new Company({
      email: 'company2@test.com',
      name: 'company2',
      password: '1234',
      address: 'address',
      phoneNumber: 'phone number',
      adminName: 'admin name',
      adminPhoneNumber: 'admin phone number',
      busPaths: [
        { name: 'name1', description: 'des1', hotels: [hotel1._id, hotel2._id] }
      ]
    })

    await Promise.all([
      Company.insertMany([company1, company2]),
      Hotel.insertMany([hotel1, hotel2])
    ])
  })

  it('get all bus path', async () => {
    const company = await Company.findById(company1._id, { busPaths: 1 })
    expect(company.busPaths.length).to.equal(2)
  })

  it('get all bus path and populate hotel', async () => {
    const company = await Company.findById(company1._id, {
      busPaths: 1
    }).populate('busPaths.hotels')
    expect(company.busPaths[0].hotels[0].name).to.equal('hotel1')
  })

  it('find bus path by name', async () => {
    const company = await Company.findById(company1._id, {
      busPaths: { $elemMatch: { name: 'name1' } }
    })
    expect(company.busPaths.length).to.equal(1)
  })

  it('add bus path', async () => {
    await Company.update(
      { _id: company1._id },
      {
        $push: {
          busPaths: { name: 'name3', description: 'des3', hotels: [hotel1._id] }
        }
      }
    )

    const company = await Company.findById(company1._id)
    expect(company.busPaths.length).to.equal(3)
  })

  it('add not dup', async () => {
    const { nModified } = await Company.update(
      { _id: company1._id, 'busPaths.name': { $ne: 'name1' } },
      {
        $push: {
          busPaths: { name: 'name1', description: 'des3', hotels: [hotel1._id] }
        }
      }
    )
    expect(nModified).to.equal(0)
    const company = await Company.findById(company1._id)
    expect(company.busPaths.length).to.equal(2)
  })
})
