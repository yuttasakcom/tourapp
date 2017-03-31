import * as mongoose from 'mongoose'
import { Mockgoose } from 'mockgoose'

const mockgoose = new Mockgoose(mongoose)

before(done => {
  mockgoose.prepareStorage().then(() => {
    console.log('prepare storage ok', mongoose.mocked)
    mongoose.connect('mongodb://localhost/tourapp_test')
    mongoose.connection
      .once('open', () => done())
      .on('error', err => console.warn('Warning', err))
  })
})

beforeEach(done => {
  mongoose.connection.db.dropDatabase()
    .then(() => done())
    .catch(() => done())
})
