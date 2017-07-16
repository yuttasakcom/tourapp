const { getSocketIds } = require('../helper')

module.exports = async (socket, data) => {
  const socketIds = await getSocketIds(data.agent)
  socketIds.forEach(socketId => {
    socket.broadcast.to(socketId).emit('bookingStatusUpdate', data)
  })
}
