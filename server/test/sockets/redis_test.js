import { expect } from 'chai'
import redis from '../../src/socket/redis'

describe.only('redis', () => {
  beforeEach(() => {
    redis.flushdb()
  })

  it('set get callback example', done => {
    redis.set('name', 'paiboon', () => {
      redis.get('name', (err, res) => {
        expect(res).to.equal('paiboon')
        done()
      })
    })
  })

  it('set get promise example', done => {
    redis.setAsync('name', 'paiboon').then(() => {
      redis.getAsync('name').then(res => {
        expect(res).to.equal('paiboon')
        done()
      })
    })
  })

  it('set get async await example', async () => {
    await redis.setAsync('name', 'paiboon')
    const res = await redis.getAsync('name')
    expect(res).to.equal('paiboon')
  })

  it('hmset async await example', async () => {
    await redis.hmsetAsync(
      'hosts',
      'mjr',
      '1',
      'another',
      '23',
      'home',
      '1234'
    )
    const obj = await redis.hgetallAsync('hosts')
    expect(obj.mjr).to.equal('1')
    expect(obj.another).to.equal('23')
    expect(obj.home).to.equal('1234')
  })

  it('hmset with object example', async () => {
    await redis.hmsetAsync('hosts', {
      mjr: 1,
      another: 23,
      home: 1234
    })
    const obj = await redis.hgetallAsync('hosts')
    expect(obj.mjr).to.equal('1')
    expect(obj.another).to.equal('23')
    expect(obj.home).to.equal('1234')
  })

  it('lpush async await example', async () => {
    await redis.lpushAsync('queue', [1, 2, 3])
    await redis.lpushAsync('queue', 4)
    const res = await redis.lrangeAsync('queue', 0, -1)
    expect(res.length).to.equal(4)
  })

  it('lrem example', async () => {
    await redis.lpushAsync('queue', ['one', 'two', 'three'])
    await redis.lremAsync('queue', 0, 'two')
    const res = await redis.lrangeAsync('queue', 0, -1)
    expect(res).to.not.include('two')
  })
})
