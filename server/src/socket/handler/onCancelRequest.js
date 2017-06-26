import { getSocketIds } from '../helper'

export const onCancelRequest = async (socket, _id) => {
  const socketIds = await getSocketIds(_id)
  socketIds.forEach(socketId => {
    socket.broadcast.to(socketId).emit('cancelRequest', socket.userDetail)
  })
}
