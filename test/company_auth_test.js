const expect = require('chai').expect
const request = require('supertest')
const app = require('../app')

describe('company authentication', () => {

  it('get /signup must return signup', done => {
    request(app)
      .get('/companies/signup')
      .expect(200)
      .end((err, res) => {
        if(err) return done(err)

        expect(res.body.msg).to.equal('signup')
        done()
      })
  })

})
