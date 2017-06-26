import io from 'socket.io-client'

export default io('http://localhost:4000', {
  query: `token=${localStorage.getItem('token')}`
})
