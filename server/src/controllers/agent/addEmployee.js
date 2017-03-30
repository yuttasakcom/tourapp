import Agent from '../../models/agent'
import {
  hashPassword,
  checkEmployeeEmailExist
} from '../../helpers/authentication'

export default (req, res, next) => {
  const agentId = req.user._id
  const employeeProps = req.body

  if (!(employeeProps.email && employeeProps.password)) {
    const err = new Error('Must provide email and password')
    err.status = 422
    return next(err)
  }

  return checkEmployeeEmailExist('Agent', agentId, employeeProps.email)
    .then(exist => {
      if (exist) {
        const err = new Error('Email is in use')
        err.status = 422
        return next(err)
      }
      return hashPassword(employeeProps.password)
        .then(hash => {
          employeeProps.password = hash
          Agent
            .update({ _id: agentId }, {
              $push: { employees: employeeProps },
            })
            .then(() => {
              res.status(201).send({ message: 'Create employee completed' })
            })
            .catch(next)
        })
        .catch(next)
    })
}
