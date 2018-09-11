import service from '@/common/fetch'
// import {getRequestUrl} from '@/common'

const SystemAPI = {
  getCaptcha () {
    return service.getRequestUrl('/captcha.jpg?t=' + Date.now())
  },
  login (username, password, captcha) {
    return service.post({
      url: '/sys/login',
      data: {username, password, captcha}
    })
  },
  logout () {
    return service.get('/sys/logout')
  }
}
export default SystemAPI
