import request from 'supertest'
import { expect } from 'chai'
import mongoose from 'mongoose'
import app from '../../../src/app'
import { password } from '../../../src/helpers/mock'

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe('Agent get companies list', () => {
  let agent1
  let company1
  let company2
  let agent1Token

  const agent1Props = {
    email: 'agent1@test.com',
    password: password.hash,
  }

  const company1Props = {
    email: 'company1@test.com',
    password: password.hash,
  }

  const company2Props = {
    email: 'company2@test.com',
    password: password.hash,
  }

  const agent1SigninProps = {...agent1Props, role: 'agent', password: password.raw }

  beforeEach(done => {
    agent1 = new Agent(agent1Props)
    company1 = new Company(company1Props)
    company2 = new Company(company2Props)

    agent1.companies.push(company1)
    agent1.companies.push(company2)

    Promise
      .all([
        agent1.save(),
        company1.save(),
        company2.save(),
      ])
      .then(() => {
        request(app)
          .post('/agents/signin')
          .send(agent1SigninProps)
          .end((err, res) => {
            agent1Token = res.body.token

            done()
          })
      })
  })


  it('two companies', done => {
    request(app)
      .get('/agents/companies')
      .set('authorization', agent1Token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        const companies = res.body
        expect(companies.length).to.equal(2)
        expect(companies[0].email).to.equal(company1Props.email)
        expect(companies[1].email).to.equal(company2Props.email)
        return done()
      })
  })
})
