const moment = require('moment')
const faker = require('faker')
const times = require('lodash/times')
const random = require('lodash/random')

const { agents, companies, pkgs } = require('./masterData')

const bookings = []

times(10000, () => {
  bookings.push({
    agent: agents[random(1)]._id,
    company: companies[0]._id,
    pkg: pkgs[random(pkgs.length - 1)],
    tourist: {
      name: faker.name.findName(),
      phoneNumber: faker.phone.phoneNumberFormat(),
      email: faker.internet.email(),
      hotel: faker.address.city(),
      roomNumber: random(1000, 9999),
      address: faker.address.country(),
      adult: random(1, 10),
      child: random(0, 5),
      nationality: ['Thai', 'European', 'Chinese'][random(2)],
      date: faker.date.between(
        moment().clone().subtract(1, 'months').format('YYYY-MM-DD'),
        moment().clone().add(1, 'months').format('YYYY-MM-DD')
      ),
      note: faker.lorem.sentence()
    },
    status: random(4)
  })
})

module.exports = bookings
