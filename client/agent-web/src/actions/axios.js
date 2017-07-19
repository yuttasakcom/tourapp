import axios from 'axios'

import { API_HOST_NAME } from '../config'

const instance = axios.create({
  baseURL: `https://${API_HOST_NAME}/agents`
})

export default instance
