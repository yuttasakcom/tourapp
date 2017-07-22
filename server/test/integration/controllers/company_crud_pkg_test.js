const { expect } = require('chai')
const mongoose = require('mongoose')
const h = require('../helpers')

const Company = mongoose.model('Company')
const Pkg = mongoose.model('Pkg')

describe('Company CRUD pkg', () => {
  let company1
  let company1Token

  const company1Props = {
    email: 'company1@test.com',
    password: '1234',
    name: 'company1'
  }

  const pkg1Props = {
    name: 'name_test',
    description: 'description_test',
    priceAdult: '3000',
    priceChild: '2000'
  }

  const company1SigninProps = Object.assign({}, company1Props, {
    role: 'company'
  })

  beforeEach(async () => {
    await h.companySignUp(company1Props)
    const company = await Company.findOne({ email: company1Props.email })
    company1 = company
    const res = await h.companySignIn(company1SigninProps)
    company1Token = res.body.token
  })

  describe('Create pkg', () => {
    it('one pkg', async () => {
      await h.companyAddPkg(company1Token, pkg1Props).expect(201)
      const pkgs = await Pkg.find({ company: company1._id })
      expect(pkgs.length).to.equal(1)
    })

    it('two pkg', async () => {
      await Promise.all([
        h.companyAddPkg(company1Token, pkg1Props),
        h.companyAddPkg(company1Token, pkg1Props)
      ])

      const pkgs = await Pkg.find({ company: company1._id })
      expect(pkgs.length).to.equal(2)
    })
  })

  describe('RUD pkg', () => {
    beforeEach(async () => {
      const pkgsStubs = new Array(10).fill(undefined).map((val, key) => ({
        company: company1._id,
        name: `name_test${key}`,
        description: `description_test${key}`,
        priceAdult: '3000',
        priceChild: '2000'
      }))

      await Pkg.insertMany(pkgsStubs)
    })

    it('GET /companies/pkgs', async () => {
      const res = await h.companyGetPkgs(company1Token).expect(200)
      expect(res.body.length).to.equal(10)
    })

    it('GET /companies/pkgs/:id', async () => {
      const pkg = await Pkg.findOne({
        company: company1._id,
        name: 'name_test0'
      })
      const pkgId = pkg._id
      const res = await h.companyGetPkg(company1Token, pkgId).expect(200)
      expect(res.body.name).to.equal('name_test0')
    })

    it('DELETE /companies/pkgs/:id', async () => {
      const pkg = await Pkg.findOne({
        company: company1._id,
        name: 'name_test0'
      })
      const pkgId = pkg._id
      await h.companyDeletePkg(company1Token, pkgId).expect(200)
      const count = await Pkg.count({ _id: pkgId })
      expect(count).to.equal(0)
    })

    it('PUT /companies/pkgs/:id', async () => {
      const pkg = await Pkg.findOne({
        company: company1._id,
        name: 'name_test0'
      })
      const pkgId = pkg._id

      const res = await h
        .companyEditPkg(company1Token, pkgId, {
          name: 'updated_name',
          description: 'updated_description',
          priceAdult: 4000,
          priceChild: 3000
        })
        .expect(200)

      const updatedPkg = res.body

      expect(updatedPkg.name).to.equal('updated_name')
      expect(updatedPkg.description).to.equal('updated_description')
      expect(updatedPkg.priceAdult).to.equal(4000)
      expect(updatedPkg.priceChild).to.equal(3000)

      const updatedResPkg = await Pkg.findById(pkgId)
      expect(updatedResPkg.name).to.equal('updated_name')
      expect(updatedResPkg.description).to.equal('updated_description')
      expect(updatedResPkg.priceAdult).to.equal(4000)
      expect(updatedResPkg.priceChild).to.equal(3000)
    })
  })
})
