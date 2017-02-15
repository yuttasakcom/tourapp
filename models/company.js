const mongoose = require('./mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true
	},
	password: String
})

const Company = mongoose.model('Company', companySchema)

module.exports = Company