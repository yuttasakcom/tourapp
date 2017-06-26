import redis from '../redis'

export const getUserDetail = ({ id }) => redis.hgetallAsync(`userDetail:${id}`)
export const getSocketIds = _id => redis.lrangeAsync(`socketId:${_id}`, 0, -1)
