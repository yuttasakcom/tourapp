import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4000'
})

instance.defaults.headers.common['Authorization'] =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OTBhN2Q3MDI2NmFlNDMxNzAxZjMwNTEiLCJzdWIiOiJwYWlib29uMTU3MjFAZ21haWwuY29tIiwicm9sZSI6ImNvbXBhbnkiLCJpYXQiOjE0OTM4NTk2OTcwMzh9._MXuNn0K1f-MWGgYo_90rSpdnf0dhwVAWUdS0uu797U'

export default instance
