import '../services/passport'
import companyRoute from './company_route'
import agentRoute from './agent_route'
import agentEmployeeRoute from './agent_employee_route'

export default app => {
  app.use('/companies', companyRoute)
  app.use('/agents', agentRoute)
  app.use('/agents-employees', agentEmployeeRoute)
}
