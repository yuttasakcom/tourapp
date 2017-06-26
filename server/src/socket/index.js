import socketIoJwt from 'socketio-jwt'

import config from '../config'
import { onDisconnect, onConnection, onRequest, onAccept } from './handler'

export default io => {
  io.use(
    socketIoJwt.authorize({
      secret: config.secret,
      handshake: true
    })
  )

  io.on('connection', async socket => {
    await onConnection(socket)
    socket.on('request', ({ _id }) => onRequest(socket, _id))
    socket.on('accept', ({ _id }) => onAccept(socket, _id))
    socket.on('disconnect', () => onDisconnect(socket))
  })
}
