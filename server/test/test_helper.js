const mongoose = require('mongoose')

before(done => {
  mongoose.connect('mongodb://localhost/tourapp_test')
  mongoose.connection
    .once('open', () => done())
    .on('error', err => console.warn('Warning', err))
})

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase()
})
