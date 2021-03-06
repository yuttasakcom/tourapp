const { pullAllBy, map, flatten, flow } = require('lodash/fp')
const mongoose = require('mongoose')
const { expect } = require('chai')

const Company = mongoose.model('Company')
const Hotel = mongoose.model('Hotel')

describe.only('Bus Path model', () => {
  let company1
  let company2
  let hotel1
  let hotel2
  let hotel3

  beforeEach(async () => {
    hotel1 = new Hotel({
      name: 'hotel1'
    })

    hotel2 = new Hotel({
      name: 'hotel2'
    })

    hotel3 = new Hotel({
      name: 'hotel3'
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
        { name: 'name1', description: 'des1', hotels: [hotel1._id] },
        { name: 'name2', description: 'des2', hotels: [hotel2._id] }
      ]
    })

    await Promise.all([
      Company.insertMany([company1, company2]),
      Hotel.insertMany([hotel1, hotel2, hotel3])
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

  it('delete bus path by id', async () => {
    const { busPaths } = await Company.findById(company1._id)
    const { _id } = busPaths[0]
    const { nModified } = await Company.update(
      { _id: company1._id },
      { $pull: { busPaths: { _id } } }
    )
    expect(nModified).to.equal(1)
    const company = await Company.findById(company1._id)
    expect(company.busPaths.length).to.equal(1)
  })

  it('get bus path hotel list must return only new', async () => {
    const { busPaths } = await Company.findById(company2._id, { busPaths: 1 })
    const managedHotels = flow(
      pullAllBy('_id')([{ _id: busPaths[0]._id }]),
      map('hotels'),
      flatten
    )(busPaths)
    const hotels = await Hotel.find({ _id: { $nin: managedHotels } })
    expect(hotels.length).to.equal(2)
  })

  it('update bus path', async () => {
    const { busPaths } = await Company.findById(company2._id, { busPaths: 1 })
    const updateProps = {
      _id: busPaths[0]._id,
      name: 'updated name1',
      description: 'updated des1',
      hotels: [hotel1._id, hotel2._id]
    }
    const updated = await Company.findOneAndUpdate(
      { _id: company2._id, 'busPaths._id': updateProps._id },
      { $set: { 'busPaths.$': updateProps } },
      {
        projection: { busPaths: { $elemMatch: { name: 'updated name1' } } },
        new: true
      }
    )
    expect(updated.busPaths.length).to.equal(1)
    expect(updated.busPaths[0].hotels.length).to.equal(2)
    expect(updated.busPaths[0].name).to.equal('updated name1')
  })

  it.only('update bus paths', async () => {
    const { busPaths } = await Company.findById(company2._id, { busPaths: 1 })
    expect(busPaths[0].hotels.length).to.equal(1)
    expect(busPaths[1].hotels.length).to.equal(1)
    const updateProps = busPaths.map(busPath => ({
      busPathId: busPath._id,
      hotelIds: [hotel1._id, hotel2._id, hotel3._id]
    }))
    const updateBusPaths = (companyId, busPathId, hotelIds) =>
      Company.update(
        {
          _id: companyId,
          'busPaths._id': busPathId
        },
        {
          $addToSet: { 'busPaths.$.hotels': { $each: hotelIds } }
        }
      )
    await Promise.all(
      updateProps.map(busPath =>
        updateBusPaths(company2._id, busPath.busPathId, busPath.hotelIds)
      )
    )
    const company = await Company.findById(company2._id, { busPaths: 1 })
    expect(company.busPaths[0].hotels.length).to.equal(3)
    expect(company.busPaths[1].hotels.length).to.equal(3)
  })
})
