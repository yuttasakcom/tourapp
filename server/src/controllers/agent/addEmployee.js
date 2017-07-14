const repo = require('../../repositories')
const auth = require('../../helpers/authentication')

module.exports = async (req, res, next) => {
  const agentId = req.user._id
  const employeeProps = req.body

  if (!(employeeProps.email && employeeProps.password)) {
    const err = new Error('Must provide email and password')
    err.status = 422
    return next(err)
  }

  const exist = await auth.checkEmployeeEmailExist(
    'Agent',
    agentId,
    employeeProps.email
  )

  if (exist) {
    const err = new Error('Email is in use')
    err.status = 422
    return next(err)
  }

  try {
    const hash = await auth.hashPassword(employeeProps.password)
    employeeProps.password = hash
    await repo.agentAddEmployee(agentId, employeeProps)
    return res.status(201).send({ message: 'Create employee completed' })
  } catch (e) {
    return next(e)
  }
}
