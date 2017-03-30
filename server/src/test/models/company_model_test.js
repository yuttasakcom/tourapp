import mongoose from 'mongoose'
import { expect } from 'chai'

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe('Company model', () => {
  describe('relationship', () => {
    let agent1
    let company1

    beforeEach(done => {
      agent1 = new Agent({
        email: 'agent1@test.com',
        password: '1234',
      })
      company1 = new Company({
        email: 'company1@test.com',
        password: '1234',
      })

      Promise
        .all([
          agent1.save(),
          company1.save(),
        ])
        .then(() => done())
    })

    it('can add agent to an existing company', done => {
      Company
        .findByIdAndUpdate(company1._id, {
          $push: { agents: agent1._id },
        }, { new: true })
        .then(() => {
          Company.findById(company1._id)
            .populate('agents')
            .then(company => {
              expect(company.agents[0].email).to.equal(agent1.email)
              done()
            })
        })
    })

    it('add agent to an existing company, and agent can list company too', done => {
      const pushAgentToCompany = Company
        .findByIdAndUpdate(company1._id, {
          $push: { agents: agent1._id },
        }, { new: true })

      const pushCompanyToAgent = Agent
        .findByIdAndUpdate(agent1._id, {
          $push: { companies: company1._id },
        }, { new: true })

      Promise
        .all([
          pushAgentToCompany,
          pushCompanyToAgent,
        ])
        .then(() => {
          Agent
            .findById(agent1._id)
            .populate('companies')
            .then(agent => {
              expect(agent.companies[0].email).to.equal(company1.email)
              done()
            })
        })
    })

    it('add agent id to requestPendings', done => {
      Company
        .findByIdAndUpdate(company1._id, {
          $addToSet: { requestPendings: agent1._id },
        }, { new: true })
        .then(company => {
          expect(company.requestPendings.length).to.be.equal(1)
          done()
        })
        .catch(done)
    })

    it('add agent id to acceptPendings', done => {
      Company
        .findByIdAndUpdate(company1._id, {
          $addToSet: { acceptPendings: agent1._id },
        }, { new: true })
        .then(company => {
          expect(company.acceptPendings.length).to.be.equal(1)
          done()
        })
        .catch(done)
    })
  })
})
