import io from 'socket.io-client'

import { API_BASE_URL } from '../../config'

export default io(API_BASE_URL, {
  query: `token=${localStorage.getItem('token')}`
})
