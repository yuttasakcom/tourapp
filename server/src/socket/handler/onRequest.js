import { getSocketIds } from '../helper'

export const onRequest = async (socket, _id) => {
  const socketIds = await getSocketIds(_id)
  socketIds.forEach(socketId => {
    socket.broadcast.to(socketId).emit('request', socket.userDetail)
  })
}
