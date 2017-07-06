const { getSocketIds } = require('../helper')

module.exports = async (socket, data) => {
  const socketIds = await getSocketIds(data.company)
  socketIds.forEach(socketId => {
    socket.broadcast.to(socketId).emit('book', data)
  })
}
