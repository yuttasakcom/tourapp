import socketIoJwt from 'socketio-jwt'
import redis from './redis'

import logger from '../utils/logger'
import config from '../config'

export default io => {
  io.use(
    socketIoJwt.authorize({
      secret: config.secret,
      handshake: true
    })
  )

  io.on('connection', async socket => {
    const { _id, sub, role } = socket.decoded_token
    logger.info(`${role} ${sub} has connected!`)
    await redis.lpushAsync(`socketId:${_id}`, socket.id)
    await redis.hmsetAsync(`userDetail:${socket.id}`, { _id, email: sub, role })

    socket.on('request', async data => {
      const resSockets = await redis.lrangeAsync(`socketId:${data._id}`, 0, -1)
      const resUserDetail = await redis.hgetallAsync(`userDetail:${socket.id}`)
      resSockets.forEach(resSocket => {
        io.to(resSocket).emit('request', resUserDetail)
      })
    })

    socket.on('disconnect', async () => {
      logger.info(`${role} ${sub} has disconnected!`)
      await redis.lremAsync(`socketId:${_id}`, 0, socket.id)
      await redis.delAsync(`userDetail:${socket.id}`)
    })
  })
}
