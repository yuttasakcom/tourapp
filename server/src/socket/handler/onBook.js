import { getSocketIds } from '../helper'

export const onBook = async (socket, data) => {
  const socketIds = await getSocketIds(data.company)
  socketIds.forEach(socketId => {
    socket.broadcast.to(socketId).emit('book', data)
  })
}
