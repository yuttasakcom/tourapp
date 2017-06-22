export default io => {
  io.on('connection', socket => {
    console.log('connected')
    socket.on('message', data => {
      socket.broadcast.emit('message', data)
    })

    socket.on('book', data => {
      socket.broadcast.emit('book', data)
    })
  })
}
