const companyRoute = require('./company_route')

module.exports = (app) => {
	app.use('/companies', companyRoute)
}