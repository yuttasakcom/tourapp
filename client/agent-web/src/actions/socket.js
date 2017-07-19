import io from 'socket.io-client'

import { API_HOST_NAME } from '../config'

export default io(`https://${API_HOST_NAME}`, {
  query: `token=${localStorage.getItem('token')}`
})
