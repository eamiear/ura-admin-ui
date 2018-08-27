import service from '@/common/fetch'
// import {getRequestUrl} from '@/common'

const SystemAPI = {
  getCaptcha () {
    return service.getRequestUrl('/captcha.jpg?t=' + Date.now())
  },
  login (username, password, captcha) {
    return service.get('/sys/login', {params: {username, password, captcha}})
  },
  logout (token) {
    return service.post('/sys/logout', {token})
  }
}
export default SystemAPI
