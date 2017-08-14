const faker = require('faker')

const Company = require('../../src/models/company')
const Agent = require('../../src/models/agent')
const Pkg = require('../../src/models/pkg')

const password = '$2a$10$sQRgGWOoCXEHwzfiCAsAcOVRfTi3SDMjIOcRvCd0p2MSMndyLSdjS'

const company1 = new Company({
  email: 'company1@company.com',
  name: 'บริษัท ท่องเที่ยว 1 จำกัด',
  phoneNumber: faker.phone.phoneNumberFormat(),
  address: '320 ซ.3 ถ.พระราม 2 แขวงบางมด เขตจอมทอง กรุงเทพฯ 10150',
  adminName: 'นายสมชาย ทดสอบ',
  adminPhoneNumber: faker.phone.phoneNumberFormat(),
  password
})

const company2 = new Company({
  email: 'company2@company.com',
  name: 'บริษัท ท่องเที่ยว 2 จำกัด',
  phoneNumber: faker.phone.phoneNumberFormat(),
  address: '243 ม.2, ต.อ่าวนาง, อ.เมือง จ.กระบี่ 81000',
  adminName: 'นายสมชาย ทดสอบ',
  adminPhoneNumber: faker.phone.phoneNumberFormat(),
  password
})

const agent1 = new Agent({
  email: 'agent1@agent.com',
  name: 'อ่าวนางทราเวล',
  phoneNumber: faker.phone.phoneNumberFormat(),
  address: '243 ม.2, ต.อ่าวนาง, อ.เมือง จ.กระบี่ 81000',
  adminName: 'นายสมชาย ทดสอบ',
  adminPhoneNumber: faker.phone.phoneNumberFormat(),
  password
})

const agent2 = new Agent({
  email: 'agent2@agent.com',
  name: 'ตัวแทนจำหน่าย 2',
  phoneNumber: faker.phone.phoneNumberFormat(),
  address: '243 ม.2, ต.อ่าวนาง, อ.เมือง จ.กระบี่ 81000',
  adminName: 'นายสมพงษ์ ทดสอบ',
  adminPhoneNumber: faker.phone.phoneNumberFormat(),
  password
})

company1.agents.push(agent1._id)
company1.agents.push(agent2._id)
agent1.companies.push(company1._id)
agent2.companies.push(company2._id)

const pkgs = [
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
  },
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
].map(pkg => new Pkg(pkg))

module.exports = {
  companies: [company1, company2],
  agents: [agent1, agent2],
  pkgs
}
