import service from '@/common/fetch'
// import {getRequestUrl} from '@/common'

const SystemAPI = {
  getCaptcha () {
    return service.getRequestUrl('/captcha.jpg?t=' + Date.now())
  },
  login (username, password, captcha) {
    return service.post('/sys/login', {username, password, captcha}, true)
  }
}
export default SystemAPI
