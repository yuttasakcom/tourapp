import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4000'
})

instance.defaults.headers.common['Authorization'] =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OTNjZGY0MjQ2MzUzODI2MWM0MzdiOWMiLCJzdWIiOiJwYWlib29uMTU3MjFAZ21haWwuY29tIiwicm9sZSI6ImNvbXBhbnkiLCJpYXQiOjE0OTcxNjE1MzkwMDR9.p402VeOXLit8QrBe5klL31Cxsh9hP13FKgbbvN1Y2Eg'
export default instance
