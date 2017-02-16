const mongoose = require('./mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		required: [true, 'Name is required']
	},
	password: {
		type: String,
		required: [true, 'Password is required']
	}
})

const Company = mongoose.model('Company', companySchema)

module.exports = Company