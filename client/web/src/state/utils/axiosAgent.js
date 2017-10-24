import axios from 'axios'

const instance = axios.create({
  baseURL: '/api/agents'
})

export default instance
