const mongoose = require('mongoose')
const { expect } = require('chai')

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe('Company model', () => {
  describe('relationship', () => {
    let agent1
    let company1

    beforeEach(async () => {
      agent1 = new Agent({
        email: 'agent1@test.com',
        password: '1234'
      })
      company1 = new Company({
        email: 'company1@test.com',
        password: '1234'
      })

      await Promise.all([agent1.save(), company1.save()])
    })

    it('can add agent to an existing company', async () => {
      await Company.findByIdAndUpdate(
        company1._id,
        {
          $push: { agents: agent1._id }
        },
        { new: true }
      )
      const company = await Company.findById(company1._id).populate('agents')
      expect(company.agents[0].email).to.equal(agent1.email)
    })

    it('add agent to an existing company, and agent can list company too', async () => {
      const pushAgentToCompany = Company.findByIdAndUpdate(
        company1._id,
        {
          $push: { agents: agent1._id }
        },
        { new: true }
      )

      const pushCompanyToAgent = Agent.findByIdAndUpdate(
        agent1._id,
        {
          $push: { companies: company1._id }
        },
        { new: true }
      )

      await Promise.all([pushAgentToCompany, pushCompanyToAgent])
      const agent = await Agent.findById(agent1._id).populate('companies')
      expect(agent.companies[0].email).to.equal(company1.email)
    })

    it('add agent id to requestPendings', async () => {
      const company = await Company.findByIdAndUpdate(
        company1._id,
        {
          $addToSet: { requestPendings: agent1._id }
        },
        { new: true }
      )
      expect(company.requestPendings.length).to.be.equal(1)
    })

    it('add agent id to acceptPendings', async () => {
      const company = await Company.findByIdAndUpdate(
        company1._id,
        {
          $addToSet: { acceptPendings: agent1._id }
        },
        { new: true }
      )
      expect(company.acceptPendings.length).to.be.equal(1)
    })
  })
})
