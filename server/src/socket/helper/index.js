const redis = require('../redis')

const getSocketIds = _id => redis.lrangeAsync(`socketId:${_id}`, 0, -1)

const getUserDetail = ({ id }) => redis.hgetallAsync(`userDetail:${id}`)

const notify = async (socket, event, _id) => {
  const socketIds = await getSocketIds(_id)
  socketIds.forEach(socketId => {
    socket.broadcast.to(socketId).emit(event, socket.userDetail)
  })
}

module.exports = {
  getSocketIds,
  getUserDetail,
  notify
}
