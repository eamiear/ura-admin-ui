import axios from 'axios'
import QS from 'qs'
import Storage from '@/common/cache'
import Router from '@/router'

const service = axios.create({
  baseURL: process.env.BASE_API,
  withCredentials: true,
  timeout: 16000
})

service.interceptors.request.use(config => {
  // setHeader()
  config.headers['token'] = Storage.get('token')
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(({data}) => {
  if (data.code === 1002) { // invalid token
    Storage.remove('token')
    Router.push({path: '/login'})
  }
  return data
}, error => {
  return Promise.reject(error)
})

service.getRequestUrl = (url) => {
  const baseURL = process.env.BASE_API
  return baseURL + url
}

const request = {
  getRequestUrl (url) {
    const baseURL = process.env.BASE_API
    return baseURL + url
  },
  get (url, params) {
    return service({
      method: 'get',
      url,
      params
    })
  },
  post (url, data, serials) {
    return service({
      method: 'post',
      url,
      data,
      // `transformRequest` 允许在向服务器发送前，修改请求数据
      // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
      // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        // 后台使用@RequestParam接收参数时，post请求需要接收 username=xxx&password=xxx的格式
        return serials ? QS.stringify(data) : data
      }]
    })
  }
}
export default request
