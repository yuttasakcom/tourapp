const { expect } = require('chai')
const mongoose = require('mongoose')

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe('Agent model', () => {
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

    it('can add company to an existing agent', async () => {
      await Agent.findByIdAndUpdate(
        agent1._id,
        {
          $push: { companies: company1._id }
        },
        { new: true }
      )

      const agent = await Agent.findById(agent1._id).populate('companies')
      expect(agent.companies[0].email).to.equal(company1.email)
    })

    it('add company to an existing agent, and company can list agent too', async () => {
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
      const company = await Company.findById(company1._id).populate('agents')
      expect(company.agents[0].email).to.equal(agent1.email)
    })

    it('add company id to requestPendings', async () => {
      const agent = await Agent.findByIdAndUpdate(
        agent1._id,
        {
          $addToSet: { requestPendings: company1._id }
        },
        { new: true }
      )
      expect(agent.requestPendings.length).to.be.equal(1)
    })

    it('add company id to acceptPendings', async () => {
      const agent = await Agent.findByIdAndUpdate(
        agent1._id,
        {
          $addToSet: { acceptPendings: company1._id }
        },
        { new: true }
      )
      expect(agent.acceptPendings.length).to.be.equal(1)
    })
  })

  it('add employees to an existing agent', async () => {
    const agent1 = new Agent({
      email: 'agent1@test.com',
      password: '1234',
      employees: []
    })

    await agent1.save()
    const resAgent = await Agent.findOne({ email: 'agent1@test.com' })
    resAgent.employees.push({
      email: 'employee1@test.com',
      password: '1234',
      name: 'name_test',
      phoneNumber: '024283192'
    })
    await resAgent.save()
    const resAgentAgain = await Agent.findOne({ email: 'agent1@test.com' })
    expect(resAgentAgain.employees[0].email).to.equal('employee1@test.com')
  })
})
