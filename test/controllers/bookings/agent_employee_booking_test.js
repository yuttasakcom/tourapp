const app = require('../../../app')
const request = require('supertest')
const expect = require('chai').expect
const mongoose = require('mongoose')
const Agent = mongoose.model('Agent')
const Booking = mongoose.model('Booking')
const { password, objectId } = require('../../../helpers/mock')

describe('Agent employee booking', () => {

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

  const booking1Props = {
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
  }

  beforeEach(done => {
    const agent1 = new Agent(agent1Props)
    agent1.save()
      .then(() => {
        request(app)
          .post('/agents-employees/signin')
          .send(agentEmployee1SigninProps)
          .end((err, res) => {
            agentEmployee1Token = res.body.token

            done()
          })
      })
  })

  it('one booking', done => {
    request(app)
      .post('/agents-employees/bookings')
      .send(booking1Props)
      .set('authorization', agentEmployee1Token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        Booking.count()
          .then(count => {
            expect(count).to.equal(1)
            done()
          })
          .catch(done)
      })
  })

})
