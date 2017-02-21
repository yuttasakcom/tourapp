const expect = require('chai').expect
const mongoose = require('mongoose')
const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe('Agent model', () => {

  describe('relationship', () => {

    let agent1, company1

    beforeEach(done => {
      agent1 = new Agent({
        email: 'agent1@test.com',
        password: '1234'
      })
      company1 = new Company({
        email: 'company1@test.com',
        password: '1234'
      })

      Promise.all([
          agent1.save(),
          company1.save()
        ])
        .then(() => done())
    })

    it('can add company to an existing agent', done => {
      Agent.findByIdAndUpdate(agent1._id, {
          $push: { 'companies': company1._id }
        }, { new: true })
        .then(() => {
          Agent.findById(agent1._id)
            .populate('companies')
            .then(agent => {
              expect(agent.companies[0].email).to.equal(company1.email)
              done()
            })
        })
    })

    it('add company to an existing agent, and company can list agent too', done => {
      const pushAgentToCompany = Company.findByIdAndUpdate(company1._id, {
        $push: { 'agents': agent1._id }
      }, { new: true })

      const pushCompanyToAgent = Agent.findByIdAndUpdate(agent1._id, {
        $push: { 'companies': company1._id }
      }, { new: true })

      Promise.all([
          pushAgentToCompany,
          pushCompanyToAgent
        ])
        .then(result => {
          Company.findById(company1._id)
            .populate('agents')
            .then(company => {
              expect(company.agents[0].email).to.equal(agent1.email)
              done()
            })
        })
    })

    it('add company id to requestPendings', done => {
      Agent.findByIdAndUpdate(agent1._id, {
          $addToSet: { 'requestPendings': company1._id }
        }, { new: true })
        .then(agent => {
          expect(agent.requestPendings.length).to.be.equal(1)
          done()
        })
        .catch(done)
    })

    it('add company id to acceptPendings', done => {
      Agent.findByIdAndUpdate(agent1._id, {
          $addToSet: { 'acceptPendings': company1._id }
        }, { new: true })
        .then(agent => {
          expect(agent.acceptPendings.length).to.be.equal(1)
          done()
        })
        .catch(done)
    })

  })

})
