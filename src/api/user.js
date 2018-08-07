import service from '@/common/fetch'
// import {getRequestUrl} from '@/common'

const UserAPI = {
  getUserInfo (uid, token) {
    return service.post('/sys/user/info', {
      uid,
      token
    })
  },
  loginByUsername (userName, password) {
    return service.post('/sys/user/login', {
      userName,
      password
    })
  },
  logout (token) {
    return service.post('/sys/user/logout', {token})
  }
}
export default UserAPI
