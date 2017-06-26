import socketIoJwt from 'socketio-jwt'
import redis from './redis'

import config from '../config'
import { onDisconnect, onConnection } from './handler'

export default io => {
  io.use(
    socketIoJwt.authorize({
      secret: config.secret,
      handshake: true
    })
  )

  io.on('connection', async socket => {
    onConnection(socket)
    const resUserDetail = await redis.hgetallAsync(`userDetail:${socket.id}`)

    socket.on('request', async data => {
      const resSockets = await redis.lrangeAsync(`socketId:${data._id}`, 0, -1)
      resSockets.forEach(resSocket => {
        io.to(resSocket).emit('request', resUserDetail)
      })
    })

    socket.on('accept', async data => {
      const resSockets = await redis.lrangeAsync(`socketId:${data._id}`, 0, -1)
      resSockets.forEach(resSocket => {
        io.to(resSocket).emit('accept', resUserDetail)
      })
    })

    socket.on('disconnect', () => onDisconnect(socket))
  })
}
