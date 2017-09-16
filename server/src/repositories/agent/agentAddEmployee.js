const Agent = require('mongoose').model('Agent')

module.exports = (agentId, employeeProps) =>
  Agent.update(
    { _id: agentId },
    {
      $push: { employees: employeeProps }
    }
  )
