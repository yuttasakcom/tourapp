const mongoose = require('mongoose')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
before(done => {
  mongoose.connect('mongodb://localhost/tourapp_test')
  mongoose.connection
    .once('open', () => done())
    .on('error', err => console.warn('Warning', err))
})

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase()
})
