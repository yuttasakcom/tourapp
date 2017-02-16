const mongoose = require('mongoose')

before(done => {
	mongoose.connect('mongodb://localhost/tourapp_test')
	mongoose.connection
		.once('open', () => done())
		.on('error', err => console.warn('Warning', err))
})

beforeEach(done => {
	const { companies } = mongoose.connection.collections
	companies.drop()
		.then(() => done())
		.catch(() => done())
})
