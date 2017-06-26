import { getSocketIds } from '../helper'

export const onAccept = async (socket, _id) => {
  const socketIds = await getSocketIds(_id)
  socketIds.forEach(socketId => {
    socket.broadcast.to(socketId).emit('accept', socket.userDetail)
  })
}
