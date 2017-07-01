import redis from '../redis'

export const getSocketIds = _id => redis.lrangeAsync(`socketId:${_id}`, 0, -1)

export const getUserDetail = ({ id }) => redis.hgetallAsync(`userDetail:${id}`)

export const notify = async (socket, event, _id) => {
  const socketIds = await getSocketIds(_id)
  socketIds.forEach(socketId => {
    socket.broadcast.to(socketId).emit(event, socket.userDetail)
  })
}
