const Agent = require('mongoose').model('Agent')
const generateToken = require('./generateToken')
const {
  hashPassword,
  checkEmailExist
} = require('../../helpers/authentication')

module.exports = async (req, res, next) => {
  const agentProps = req.body
  const agent = new Agent(agentProps)
  const validationErr = agent.validateSync()
  if (validationErr) {
    const err = new Error('กรุณาระบุข้อมูลให้ครบ')
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

    const token = generateToken(resAgent)
    res.cookie('jwt', token)
    return res.status(201).send({ token })
  } catch (e) {
    return next(e)
  }
}
