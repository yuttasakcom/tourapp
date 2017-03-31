import mongoose from 'mongoose'

before(done => {
  mongoose.connect('mongodb://localhost/tourapp_test')
  mongoose.connection
    .once('open', () => done())
    .on('error', err => console.warn('Warning', err))
})

beforeEach(done => {
  mongoose.connection.db.dropDatabase()
    .then(() => done())
    .catch(() => done())
})
