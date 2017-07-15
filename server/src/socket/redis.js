const redis = require('redis')
const bluebird = require('bluebird')

const { REDIS_HOST } = require('../config')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

module.exports = redis.createClient({
  host: REDIS_HOST
})
