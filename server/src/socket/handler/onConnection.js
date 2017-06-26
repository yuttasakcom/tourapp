import redis from '../redis'
import logger from '../../utils/logger'

export const onConnection = async ({
  decoded_token: { _id, sub, role },
  id
}) => {
  logger.info(`${role} ${sub} has connected!`)
  await redis.lpushAsync(`socketId:${_id}`, id)
  await redis.hmsetAsync(`userDetail:${id}`, { _id, email: sub, role })
}
