require('../services/passport')
const companyRoute = require('./company_route')
const agentRoute = require('./agent_route')
const agentEmployeeRoute = require('./agent_employee_route')

module.exports = app => {
  app.use('/companies', companyRoute)
  app.use('/agents', agentRoute)
  app.use('/agents-employees', agentEmployeeRoute)
}
