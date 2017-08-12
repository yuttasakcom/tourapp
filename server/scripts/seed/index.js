const mongoose = require('mongoose')

const Pkg = require('../../src/models/pkg')
const Company = require('../../src/models/company')
const Agent = require('../../src/models/agent')
const Booking = require('../../src/models/booking')
const Hotel = require('../../src/models/hotel')
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
