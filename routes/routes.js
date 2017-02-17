const companyRoute = require('./company_route')
const agentRoute = require('./agent_route')

module.exports = (app) => {
	app.use('/companies', companyRoute)
	app.use('/agents', agentRoute)
}