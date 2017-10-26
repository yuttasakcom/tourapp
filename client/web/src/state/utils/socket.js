import io from 'socket.io-client'
import cookie from 'js-cookie'

export default io('/', {
  query: `token=${cookie.get('jwt')}`
})
