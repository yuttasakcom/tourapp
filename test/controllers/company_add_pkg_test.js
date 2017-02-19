const app = require('../../app')
const request = require('supertest')
const expect = require('chai').expect
const mongoose = require('mongoose')
const Company = mongoose.model('Company')

describe('Company add pkg', () => {

  let company1, company1Token

  const company1Props = {
    email: 'company1@test.com',
    password: '1234'
  }

  const company1SigninProps = Object.assign({}, company1Props, { role: 'company' })

  beforeEach(done => {

    company1 = new Company(company1Props)
    company1.save()
      .then(() => {
        request(app)
          .post('/companies/signin')
          .send(company1SigninProps)
          .end((err, res) => {
            company1Token = res.body.token

            done()
          })
      })
  })

  it('one pkg', done => {
    request(app)
      .post('/companies/pkgs')
      .send({
        name: 'name_test',
        description: 'description_test',
        priceAdult: '3000',
        priceChild: '2000'
      })
      .set('authorization', company1Token)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)

        Company.findById(company1._id)
          .then(company => {
            expect(company.pkgs.length).to.equal(1)
            done()
          })
          .catch(done)
      })
  })

})
