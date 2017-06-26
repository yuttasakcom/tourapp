import redis from '../redis'
import logger from '../../utils/logger'
import { getUserDetail } from '../helper'

export const onConnection = async socket => {
  const { _id, sub, role } = socket.decoded_token
  const { id } = socket
  logger.info(`${role} ${sub} has connected!`)
  await redis.lpushAsync(`socketId:${_id}`, id)
  await redis.hmsetAsync(`userDetail:${id}`, { _id, email: sub, role })
  socket.userDetail = await getUserDetail(socket)
}
