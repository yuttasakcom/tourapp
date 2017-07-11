const Agent = require('../../models/agent')

module.exports = (agentId, employeeProps) =>
  Agent.update(
    { _id: agentId },
    {
      $push: { employees: employeeProps }
    }
  )
