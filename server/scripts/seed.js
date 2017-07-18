const mongoose = require('mongoose')
const { MONGO_DB_HOST } = require('../src/config')
const Company = require('../src/models/company')
const Agent = require('../src/models/agent')
const Pkg = require('../src/models/pkg')

const password = {
  raw: '1234',
  hash: '$2a$10$sQRgGWOoCXEHwzfiCAsAcOVRfTi3SDMjIOcRvCd0p2MSMndyLSdjS'
}

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${MONGO_DB_HOST}/tourapp`)
mongoose.connection.once('open', () => {
  mongoose.connection.db.dropDatabase().then(() => {
    const company1 = new Company({
      email: 'company1@company.com',
      password: password.hash,
      name: 'บริษัท ท่องเที่ยว 1 จำกัด'
    })

    const company2 = new Company({
      email: 'company2@company.com',
      password: password.hash,
      name: 'บริษัท ท่องเที่ยว 2 จำกัด'
    })

    const agent1 = new Agent({
      email: 'agent1@agent.com',
      password: password.hash,
      name: 'ตัวแทนจำหน่าย 1'
    })
    const agent2 = new Agent({
      email: 'agent2@agent.com',
      password: password.hash,
      name: 'ตัวแทนจำหน่าย 2'
    })
    const company1Pkgs = [
      {
        name: 'สระมรกต',
        description: 'รายละเอียดสระมรกต',
        priceAdult: 2000,
        priceChild: 1500,
        company: company1._id
      },
      {
        name: 'ถ้ำทะเลเขากอบ',
        description: 'รายละเอียดถ้ำทะเลเขากอบ',
        priceAdult: 2400,
        priceChild: 1800,
        company: company1._id
      },
      {
        name: 'เกาะทะลุ',
        description: 'รายละเอียดเกาะทะลุ',
        priceAdult: 2000,
        priceChild: 1500,
        company: company1._id
      }
    ]
    const company2Pkgs = [
      {
        name: 'ทัวร์ 4 เกาะ',
        description: 'รายละเอียดทัวร์ 4 เกาะ',
        priceAdult: 3000,
        priceChild: 2500,
        company: company2._id
      },
      {
        name: 'เกาะพยาม',
        description: 'รายละเอียดเกาะพยาม',
        priceAdult: 2800,
        priceChild: 2500,
        company: company2._id
      },
      {
        name: 'หมู่เกาะสุรินทร์',
        description: 'รายละเอียดหมู่เกาะสุรินทร์',
        priceAdult: 3200,
        priceChild: 2500,
        company: company2._id
      }
    ]
    Promise.all([
      company1.save(),
      company2.save(),
      agent1.save(),
      agent2.save(),
      Pkg.insertMany(company1Pkgs),
      Pkg.insertMany(company2Pkgs)
    ])
      .then(() => {
        mongoose.connection.close()
        console.log('Seed data completed')
      })
      .catch(console.log)
  })
})
