import Agent from '../../models/agent'
import generateToken from './generateToken'
import { hashPassword, checkEmailExist } from '../../helpers/authentication'

export const signup = async (req, res, next) => {
  const agentProps = req.body
  const agent = new Agent(agentProps)
  const validationErr = agent.validateSync()
  if (validationErr) {
    const err = new Error('Must provide email and password')
    err.status = 422
    return next(err)
  }

  try {
    const exist = await checkEmailExist('Agent', agent.email)

    if (exist) {
      const err = new Error('Email is in use')
      err.status = 422
      return next(err)
    }

    const hash = await hashPassword(agent.password)
    agent.password = hash
    const resAgent = await agent.save()

    return res.status(201).send({
      token: generateToken(resAgent),
      _id: resAgent._id
    })
  } catch (e) {
    return next(e)
  }
}
