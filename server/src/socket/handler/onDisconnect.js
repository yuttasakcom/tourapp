const redis = require('../redis')
const logger = require('../../utils/logger')

module.exports = async ({ decoded_token: { _id, sub, role }, id }) => {
  logger.info(`${role} ${sub} has disconnected!`)
  await redis.lremAsync(`socketId:${_id}`, 0, id)
  await redis.delAsync(`userDetail:${id}`)
}
