import axios from 'axios'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 16000
})

service.interceptors.request.use(config => {
  // setHeader()
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(({data}) => {
  return data
}, error => {
  return Promise.reject(error)
})

export default service
