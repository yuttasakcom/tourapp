import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://localhost:4000/agents'
})

export default instance
