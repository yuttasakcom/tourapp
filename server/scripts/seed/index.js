const mongoose = require('mongoose')
require('../../src/models/agent')
require('../../src/models/booking')
require('../../src/models/company')
require('../../src/models/hotel')
require('../../src/models/pkg')

const Pkg = mongoose.model('Pkg')
const Company = mongoose.model('Company')
const Agent = mongoose.model('Agent')
const Booking = mongoose.model('Booking')
const Hotel = mongoose.model('Hotel')
const { MONGO_DB_HOST } = require('../../src/config')
const { companies, agents, pkgs } = require('./masterData')
const bookings = require('./bookingsData')
const hotels = require('./hotelsData')

mongoose.Promise = global.Promise

mongoose.connect(`mongodb://${MONGO_DB_HOST}/tourapp`)
mongoose.connection.once('open', async () => {
  await mongoose.connection.db.dropDatabase()
  await Promise.all([
    Company.insertMany(companies),
    Agent.insertMany(agents),
    Pkg.insertMany(pkgs),
    Booking.insertMany(bookings),
    Hotel.insertMany(hotels)
  ])
  mongoose.connection.close()
  console.log('Seed data completed')
})
