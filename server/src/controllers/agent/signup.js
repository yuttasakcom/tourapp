import Agent from '../../models/agent'
import generateToken from './generateToken'
import {
  hashPassword,
  checkEmailExist
} from '../../helpers/authentication'

export default (req, res, next) => {
  const agentProps = req.body
  const agent = new Agent(agentProps)
  const validationErr = agent.validateSync()
  if (validationErr) {
    const err = new Error('Must provide email and password')
    err.status = 422
    return next(err)
  }

  return checkEmailExist('Agent', agent.email)
    .then(exist => {
      if (exist) {
        const err = new Error('Email is in use')
        err.status = 422
        return next(err)
      }
      return hashPassword(agent.password)
        .then(hash => {
          agent.password = hash
          agent.save()
            .then(resAgent =>
              res.status(201).send({
                token: generateToken(resAgent),
              })
            )
            .catch(next)
        })
        .catch(next)
    })
    .catch(next)
}
