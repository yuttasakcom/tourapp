import _ from 'lodash'
import socketIoJwt from 'socketio-jwt'
import logger from '../utils/logger'
import config from '../config'

export default io => {
  io.use(
    socketIoJwt.authorize({
      secret: config.secret,
      handshake: true
    })
  )

  io.on('connection', socket => {
    const { _id, sub, role } = socket.decoded_token
    logger.info(`${role} ${sub} has connected!`)

    socket.on('message', data => {
      socket.broadcast.emit('message', data)
    })

    socket.on('book', data => {
      socket.broadcast.emit(data.company, data)
    })

    socket.on('disconnect', () => {
      logger.info(`${role} S${sub} has disconnected!`)
    })
  })
}
