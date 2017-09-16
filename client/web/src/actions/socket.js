import io from 'socket.io-client'

export default io('/', {
  query: `token=${localStorage.getItem('token')}`
})
