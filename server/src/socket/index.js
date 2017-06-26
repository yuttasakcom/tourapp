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

    socket.on('message', data => {
      socket.broadcast.emit('message', data)
    })

    socket.on('book', data => {
      socket.broadcast.emit(data.company, data)
    })

    socket.on('disconnect', async () => {
      logger.info(`${role} ${sub} has disconnected!`)
      await redis.lremAsync(`socketId:${_id}`, 0, socket.id)
    })
  })
}
