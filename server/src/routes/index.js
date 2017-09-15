require('../services/passport')
const companyRoute = require('./company_route')
const agentRoute = require('./agent_route')
const agentEmployeeRoute = require('./agent_employee_route')

module.exports = app => {
  app.use('/api/companies', companyRoute)
  app.use('/api/agents', agentRoute)
  app.use('/api/agents-employees', agentEmployeeRoute)
}
