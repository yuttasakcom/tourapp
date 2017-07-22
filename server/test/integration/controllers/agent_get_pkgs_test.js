const { expect } = require('chai')
const mongoose = require('mongoose')
const h = require('../helpers')

const Company = mongoose.model('Company')
const Agent = mongoose.model('Agent')
const Pkg = mongoose.model('Pkg')

describe('Agent get pkgs', () => {
  let company1
  let company2
  let agent1
  let company1Token
  let company2Token
  let agent1Token

  const company1Props = {
    email: 'company1@test.com',
    password: h.password.hash,
    name: 'company1'
  }

  const company2Props = {
    email: 'company2@test.com',
    password: h.password.hash,
    name: 'company2'
  }

  const agent1Props = {
    email: 'agent1@test.com',
    password: h.password.hash,
    name: 'agent1'
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
      h.companySignIn(company2SigninProps),
      h.agentSignIn(agent1SigninProps)
    ])
    company1Token = res1.body.token
    company2Token = res2.body.token
    agent1Token = res3.body.token
    await h.agentRequest(agent1Token, company1)
    await h.companyAccept(company1Token, agent1)
  })

  it('one member', async () => {
    const res = await h.agentGetPkgs(agent1Token)
    expect(res.body[0].company.email).to.equal('company1@test.com')
    expect(res.body.length).to.equal(10)
  })

  it('two member', async () => {
    await h.agentRequest(agent1Token, company2)
    await h.companyAccept(company2Token, agent1)
    const res = await h.agentGetPkgs(agent1Token)
    expect(res.body.length).to.equal(20)
  })

  it('if has special price show special price', async () => {
    const pkg = await Pkg.findOne({ company: company1._id, name: 'name_test0' })
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
    const res = await h.agentGetPkgs(agent1Token)
    expect(res.body[0].priceAdult).to.equal(2500)
  })
})
