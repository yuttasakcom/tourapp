import socketIoJwt from 'socketio-jwt'

import config from '../config'
import * as h from './handler'

export default io => {
  io.use(
    socketIoJwt.authorize({
      secret: config.secret,
      handshake: true
    })
  )

  io.on('connection', async socket => {
    await h.onConnection(socket)
    socket.on('request', ({ _id }) => h.onRequest(socket, _id))
    socket.on('accept', ({ _id }) => h.onAccept(socket, _id))
    socket.on('cancelRequest', ({ _id }) => h.onCancelRequest(socket, _id))
    socket.on('deleteRelationship', ({ _id }) =>
      h.onDeleteRelationship(socket, _id)
    )
    socket.on('rejectRequest', ({ _id }) => h.onRejectRequest(socket, _id))
    socket.on('disconnect', () => h.onDisconnect(socket))
  })
}
