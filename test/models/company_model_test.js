const Company = require('../../models/company')
const Agent = require('../../models/agent')
const expect = require('chai').expect

describe.only('Company model', () => {

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

  it('can add agent to an existing company', done => {
    Company.findByIdAndUpdate(company1._id, {
        $push: { 'agents': agent1._id }
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

})
