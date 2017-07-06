const redis = require('../redis')
const logger = require('../../utils/logger')
const { getUserDetail } = require('../helper')

module.exports = async socket => {
  const { _id, sub, role } = socket.decoded_token
  const { id } = socket
  logger.info(`${role} ${sub} has connected!`)
  await redis.lpushAsync(`socketId:${_id}`, id)
  await redis.hmsetAsync(`userDetail:${id}`, { _id, email: sub, role })
  socket.userDetail = await getUserDetail(socket)
}
