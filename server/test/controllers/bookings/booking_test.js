const { expect } = require('chai')
const mongoose = require('mongoose')
const h = require('../../helpers')
const { status } = require('../../../src/helpers/booking')

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')
const Booking = mongoose.model('Booking')
const Pkg = mongoose.model('Pkg')

describe('Booking', () => {
  let company1
  let company2
  let company1Token
  let agent1
  let agent1Token
  let agentEmployee1Token

  const agentEmployee1Props = {
    email: 'agentemployee1@test.com',
    password: h.password.hash,
    name: 'name_test',
    phoneNumber: '024283192'
  }

  const agent1Props = {
    email: 'agent1@test.com',
    password: h.password.hash,
    employees: [agentEmployee1Props]
  }

  const agentEmployee1SigninProps = {
    email: 'agent1@test.com..agentemployee1@test.com',
    password: h.password.raw,
    role: 'agentEmployee'
  }

  const company1Props = {
    email: 'company1@test.com',
    password: h.password.hash
  }

  const company2Props = {
    email: 'company2@test.com',
    password: h.password.hash
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

  const company1SigninProps = Object.assign({}, company1Props, {
    role: 'company',
    password: h.password.raw
  })

  const company2SigninProps = Object.assign({}, company2Props, {
    role: 'company',
    password: h.password.raw
  })

  const agent1SigninProps = Object.assign({}, agent1Props, {
    role: 'agent',
    password: h.password.raw
  })

  beforeEach(async () => {
    company1 = new Company(company1Props)
    company2 = new Company(company2Props)
    agent1 = new Agent(agent1Props)

    const company1PkgsStubs = new Array(10).fill(undefined).map((val, key) => ({
      company: company1._id,
      name: `name_test${key}`,
      description: `description_test${key}`,
      priceAdult: '3000',
      priceChild: '2000'
    }))

    const company2PkgsStubs = new Array(10).fill(undefined).map((val, key) => ({
      company: company2._id,
      name: `name_test${key}`,
      description: `description_test${key}`,
      priceAdult: '3000',
      priceChild: '2000'
    }))

    const pkgsStubs = company1PkgsStubs.concat(company2PkgsStubs)

    await Promise.all([
      company1.save(),
      company2.save(),
      agent1.save(),
      Pkg.insertMany(pkgsStubs)
    ])

    const [res1, res2, res3] = await Promise.all([
      h.companySignIn(company1SigninProps),
      h.agentSignIn(agent1SigninProps),
      h.agentEmployeeSignIn(agentEmployee1SigninProps),
      h.companySignIn(company2SigninProps)
    ])

    company1Token = res1.body.token
    agent1Token = res2.body.token
    agentEmployee1Token = res3.body.token

    await h.agentRequest(agent1Token, company1)
    await h.companyAccept(company1Token, agent1)
  })

  describe('Company get pkgs list and special price by agentId', () => {
    it('GET /companies/special-prices/:agentId', async () => {
      const pkg = await Pkg.findOne({
        company: company1._id,
        name: 'name_test0'
      })

      await h.companyOfferSpecialPrice(company1Token, pkg._id, {
        agent: agent1._id,
        priceAdult: 2500,
        priceChild: 1500
      })

      const res = await h
        .companyGetSpecialPrices(company1Token, agent1._id)
        .expect(200)

      expect(res.body.length).to.equal(10)
      expect(res.body[0].priceAdult).to.equal(2500)
    })
  })

  describe('Company offer special price', () => {
    it('offer package1 to agent1', async () => {
      const pkg = await Pkg.findOne({
        company: company1._id,
        name: 'name_test0'
      })

      await h.companyOfferSpecialPrice(company1Token, pkg._id, {
        agent: agent1._id,
        priceAdult: 2500,
        priceChild: 1500
      })

      const pkg1 = await Pkg.findById(pkg._id, {
        specialPrices: {
          $elemMatch: { agent: agent1._id }
        }
      })

      expect(pkg1.specialPrices[0].priceAdult).to.equal(2500)
    })

    it('reset price must remove special price', async () => {
      const pkg = await Pkg.findOne({
        company: company1._id,
        name: 'name_test0'
      })

      await h
        .companyOfferSpecialPrice(company1Token, pkg._id, {
          agent: agent1._id,
          priceAdult: 2500,
          priceChild: 1500
        })
        .expect(200)

      await h
        .companyResetSpecialPrice(company1Token, pkg._id, agent1._id)
        .expect(200)

      const pkg1 = await Pkg.findById(pkg._id, {
        specialPrices: {
          $elemMatch: { agent: agent1._id }
        }
      })

      expect(pkg1.specialPrices.length).to.equal(0)
    })

    it('offer same pkg again must update', async () => {
      const pkg = await Pkg.findOne({
        company: company1._id,
        name: 'name_test0'
      })

      await h.companyOfferSpecialPrice(company1Token, pkg._id, {
        agent: agent1._id,
        priceAdult: 2500,
        priceChild: 1500
      })

      await h.companyOfferSpecialPrice(company1Token, pkg._id, {
        agent: company1._id,
        priceAdult: 5555,
        priceChild: 4444
      })

      await h.companyOfferSpecialPrice(company1Token, pkg._id, {
        agent: agent1._id,
        priceAdult: 2000,
        priceChild: 1000
      })

      const pkg1 = await Pkg.findById(pkg._id)
      expect(pkg1.specialPrices[0].priceAdult).to.equal(2000)
      expect(pkg1.specialPrices[1].priceAdult).to.equal(5555)
    })
  })

  describe('Agent employee get pkgs list', () => {
    it('one member', async () => {
      const res = await h.agentEmployeeGetPkgs(agentEmployee1Token).expect(200)
      expect(res.body.length).to.equal(10)
    })

    it('if has special price show special price', async () => {
      const pkg = await Pkg.findOne({
        company: company1._id,
        name: 'name_test0'
      })
      pkg.specialPrices.push({
        agent: agent1._id,
        priceAdult: 2500,
        priceChild: 1500
      })
      pkg.specialPrices.push({
        agent: company2._id,
        priceAdult: 1500,
        priceChild: 500
      })

      await pkg.save()
      const res = await h.agentEmployeeGetPkgs(agentEmployee1Token).expect(200)
      expect(res.body[0].priceAdult).to.equal(2500)
    })
  })

  describe('Add booking', () => {
    let booking1Props

    beforeEach(async () => {
      const pkg = await Pkg.findOne({
        company: company1._id,
        name: 'name_test0'
      })
      booking1Props = {
        company: company1._id,
        pkg,
        tourist: touristProps
      }
    })

    it('agent one booking', async () => {
      await h.agentAddBooking(agent1Token, booking1Props).expect(200)
      const count = await Booking.count()
      expect(count).to.equal(1)
    })

    it('agent employee one booking', async () => {
      await h
        .agentEmployeeAddBooking(agentEmployee1Token, booking1Props)
        .expect(200)
      const count = await Booking.count()
      expect(count).to.equal(1)
    })

    it('agent employee not member must return status 401', async () => {
      booking1Props.company = company2._id
      await h
        .agentEmployeeAddBooking(agentEmployee1Token, booking1Props)
        .expect(401)
      const count = await Booking.count()
      expect(count).to.equal(0)
    })

    it('Company get bookings list', async () => {
      await h.agentEmployeeAddBooking(agentEmployee1Token, booking1Props)
      const res = await h.companyGetBookings(company1Token).expect(200)
      expect(res.body.length).to.equal(1)
    })

    it('Agent get bookings list', async () => {
      await h.agentEmployeeAddBooking(agentEmployee1Token, booking1Props)
      const res = await h.agentGetBookings(agent1Token).expect(200)
      expect(res.body.length).to.equal(1)
    })
  })

  describe('Company change booking status', () => {
    it('accept', async () => {
      const res = await h.agentEmployeeGetPkgs(agentEmployee1Token)
      const pkg = res.body[0]
      const booking1Props = {
        company: company1._id,
        pkg,
        tourist: touristProps
      }
      await h.agentEmployeeAddBooking(agentEmployee1Token, booking1Props)
      const res1 = await h.companyGetBookings(company1Token)

      const bookingId = res1.body[0]._id
      await h
        .companyUpdateBookingStatus(company1Token, bookingId, status.accepted)
        .expect(200)
      const booking = await Booking.findById(bookingId)
      expect(booking.status).to.equal(status.accepted)
    })
  })
})
