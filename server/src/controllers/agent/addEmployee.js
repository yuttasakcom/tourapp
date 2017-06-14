import Agent from '../../models/agent'
import {
  hashPassword,
  checkEmployeeEmailExist
} from '../../helpers/authentication'

export const addEmployee = async (req, res, next) => {
  const agentId = req.user._id
  const employeeProps = req.body

  if (!(employeeProps.email && employeeProps.password)) {
    const err = new Error('Must provide email and password')
    err.status = 422
    return next(err)
  }

  const exist = await checkEmployeeEmailExist(
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
    const hash = await hashPassword(employeeProps.password)
    employeeProps.password = hash

    await Agent.update(
      { _id: agentId },
      {
        $push: { employees: employeeProps }
      }
    )
    return res.status(201).send({ message: 'Create employee completed' })
  } catch (e) {
    return next(e)
  }
}
