import redis from '../redis'
import logger from '../../utils/logger'

export const onDisconnect = async ({
  decoded_token: { _id, sub, role },
  id
}) => {
  logger.info(`${role} ${sub} has disconnected!`)
  await redis.lremAsync(`socketId:${_id}`, 0, id)
  await redis.delAsync(`userDetail:${id}`)
}
