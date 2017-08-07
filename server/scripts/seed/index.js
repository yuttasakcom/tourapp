const mongoose = require('mongoose')

const Pkg = require('../../src/models/pkg')
const Company = require('../../src/models/company')
const Agent = require('../../src/models/agent')
const { MONGO_DB_HOST } = require('../../src/config')
const { companies, agents, pkgs } = require('./masterData')

mongoose.Promise = global.Promise

mongoose.connect(`mongodb://${MONGO_DB_HOST}/tourapp`)
mongoose.connection.once('open', async () => {
  await mongoose.connection.db.dropDatabase()
  await Promise.all([
    Company.insertMany(companies),
    Agent.insertMany(agents),
    Pkg.insertMany(pkgs)
  ])
  mongoose.connection.close()
  console.log('Seed data completed')
})
