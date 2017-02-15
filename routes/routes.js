const companyAuthRoute = require('./company_auth_route')

module.exports = (app) => {
	app.use('/companies', companyAuthRoute)
}