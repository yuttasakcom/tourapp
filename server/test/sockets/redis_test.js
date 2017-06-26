import { expect } from 'chai'
import redis from 'redis'
import bluebird from 'bluebird'

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const client = redis.createClient()

describe.only('redis', () => {
  beforeEach(() => {
    client.flushdb()
  })

  it('set get callback example', done => {
    client.set('name', 'paiboon', () => {
      client.get('name', (err, res) => {
        expect(res).to.equal('paiboon')
        done()
      })
    })
  })

  it('set get promise example', done => {
    client.setAsync('name', 'paiboon').then(() => {
      client.getAsync('name').then(res => {
        expect(res).to.equal('paiboon')
        done()
      })
    })
  })

  it('set get async await example', async () => {
    await client.setAsync('name', 'paiboon')
    const res = await client.getAsync('name')
    expect(res).to.equal('paiboon')
  })

  it('hmset async await example', async () => {
    await client.hmsetAsync(
      'hosts',
      'mjr',
      '1',
      'another',
      '23',
      'home',
      '1234'
    )
    const obj = await client.hgetallAsync('hosts')
    expect(obj.mjr).to.equal('1')
    expect(obj.another).to.equal('23')
    expect(obj.home).to.equal('1234')
  })

  it('hmset with object example', async () => {
    await client.hmsetAsync('hosts', {
      mjr: 1,
      another: 23,
      home: 1234
    })
    const obj = await client.hgetallAsync('hosts')
    expect(obj.mjr).to.equal('1')
    expect(obj.another).to.equal('23')
    expect(obj.home).to.equal('1234')
  })

  it('lpush async await example', async () => {
    await client.lpushAsync('queue', [1, 2, 3])
    await client.lpushAsync('queue', 4)
    const res = await client.lrangeAsync('queue', 0, -1)
    expect(res.length).to.equal(4)
  })

  it('lrem example', async () => {
    await client.lpushAsync('queue', ['one', 'two', 'three'])
    await client.lremAsync('queue', 0, 'two')
    const res = await client.lrangeAsync('queue', 0, -1)
    expect(res).to.not.include('two')
  })
})
