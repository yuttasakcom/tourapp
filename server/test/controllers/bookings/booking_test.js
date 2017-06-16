import request from 'supertest'
import { expect } from 'chai'
import mongoose from 'mongoose'
import app from '../../../src/app'
import { password } from '../../../src/helpers/mock'
import { status } from '../../../src/helpers/booking'

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
    password: password.hash,
    name: 'name_test',
    phoneNumber: '024283192'
  }

  const agent1Props = {
    email: 'agent1@test.com',
    password: password.hash,
    employees: [agentEmployee1Props]
  }

  const agentEmployee1SigninProps = {
    email: 'agent1@test.com..agentemployee1@test.com',
    password: password.raw,
    role: 'agentEmployee'
  }

  const company1Props = {
    email: 'company1@test.com',
    password: password.hash
  }

  const company2Props = {
    email: 'company2@test.com',
    password: password.hash
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

  const company1SigninProps = {
    ...company1Props,
    role: 'company',
    password: password.raw
  }
  const company2SigninProps = {
    ...company2Props,
    role: 'company',
    password: password.raw
  }
  const agent1SigninProps = {
    ...agent1Props,
    role: 'agent',
    password: password.raw
  }

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
      request(app).post('/companies/signin').send(company1SigninProps),
      request(app).post('/agents/signin').send(agent1SigninProps),
      request(app)
        .post('/agents-employees/signin')
        .send(agentEmployee1SigninProps),
      request(app).post('/companies/signin').send(company2SigninProps)
    ])

    company1Token = res1.body.token
    agent1Token = res2.body.token
    agentEmployee1Token = res3.body.token

    await request(app)
      .post('/agents/request')
      .send({ _id: company1._id })
      .set('authorization', agent1Token)

    await request(app)
      .post('/companies/accept')
      .send({ _id: agent1._id })
      .set('authorization', company1Token)
  })

  describe('Company get pkgs list and special price by agentId', () => {
    it('GET /companies/special-prices/:agentId', async () => {
      const pkg = await Pkg.findOne({
        company: company1._id,
        name: 'name_test0'
      })

      await request(app)
        .post(`/companies/pkgs/${pkg._id}/special-prices`)
        .send({
          agent: agent1._id,
          priceAdult: 2500,
          priceChild: 1500
        })
        .set('authorization', company1Token)

      const res = await request(app)
        .get(`/companies/special-prices/${agent1._id}`)
        .set('authorization', company1Token)
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
      await request(app)
        .post(`/companies/pkgs/${pkg._id}/special-prices`)
        .send({
          agent: agent1._id,
          priceAdult: 2500,
          priceChild: 1500
        })
        .set('authorization', company1Token)
        .expect(200)

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

      await request(app)
        .post(`/companies/pkgs/${pkg._id}/special-prices`)
        .send({
          agent: agent1._id,
          priceAdult: 2500,
          priceChild: 1500
        })
        .set('authorization', company1Token)
        .expect(200)

      await request(app)
        .delete(`/companies/pkgs/${pkg._id}/special-prices/${agent1._id}`)
        .set('authorization', company1Token)
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

      await request(app)
        .post(`/companies/pkgs/${pkg._id}/special-prices`)
        .send({
          agent: agent1._id,
          priceAdult: 2500,
          priceChild: 1500
        })
        .set('authorization', company1Token)

      await request(app)
        .post(`/companies/pkgs/${pkg._id}/special-prices`)
        .send({
          agent: company1._id,
          priceAdult: 5555,
          priceChild: 4444
        })
        .set('authorization', company1Token)

      await request(app)
        .post(`/companies/pkgs/${pkg._id}/special-prices`)
        .send({
          agent: agent1._id,
          priceAdult: 2000,
          priceChild: 1000
        })
        .set('authorization', company1Token)

      const pkg1 = await Pkg.findById(pkg._id)
      expect(pkg1.specialPrices[0].priceAdult).to.equal(2000)
      expect(pkg1.specialPrices[1].priceAdult).to.equal(5555)
    })
  })

  describe('Agent employee get pkgs list', () => {
    it('one member', async () => {
      const res = await request(app)
        .get('/agents-employees/pkgs')
        .set('authorization', agentEmployee1Token)
        .expect(200)

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
      const res = await request(app)
        .get('/agents-employees/pkgs')
        .set('authorization', agentEmployee1Token)
        .expect(200)

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
      await request(app)
        .post('/agents/bookings')
        .send(booking1Props)
        .set('authorization', agent1Token)
        .expect(200)

      const count = await Booking.count()
      expect(count).to.equal(1)
    })

    it('agent employee one booking', async () => {
      await request(app)
        .post('/agents-employees/bookings')
        .send(booking1Props)
        .set('authorization', agentEmployee1Token)
        .expect(200)

      const count = await Booking.count()
      expect(count).to.equal(1)
    })

    it('agent employee not member must return status 401', async () => {
      booking1Props.company = company2._id
      await request(app)
        .post('/agents-employees/bookings')
        .send(booking1Props)
        .set('authorization', agentEmployee1Token)
        .expect(401)

      const count = await Booking.count()
      expect(count).to.equal(0)
    })

    it('Company get bookings list', async () => {
      await request(app)
        .post('/agents-employees/bookings')
        .send(booking1Props)
        .set('authorization', agentEmployee1Token)
        .expect(200)

      const res = await request(app)
        .get('/companies/bookings')
        .set('authorization', company1Token)
        .expect(200)

      expect(res.body.length).to.equal(1)
    })
  })

  describe('Company change booking status', () => {
    it('accept', async () => {
      const res = await request(app)
        .get('/agents-employees/pkgs')
        .set('authorization', agentEmployee1Token)

      const pkg = res.body[0]
      const booking1Props = {
        company: company1._id,
        pkg,
        tourist: touristProps
      }

      await request(app)
        .post('/agents-employees/bookings')
        .send(booking1Props)
        .set('authorization', agentEmployee1Token)

      const res1 = await request(app)
        .get('/companies/bookings')
        .set('authorization', company1Token)

      const bookingId = res1.body[0]._id
      await request(app)
        .put(`/companies/bookings/${bookingId}`)
        .send({ status: status.accepted })
        .set('authorization', company1Token)
        .expect(200)

      const booking = await Booking.findById(bookingId)
      expect(booking.status).to.equal(status.accepted)
    })
  })
})
