import service from '@/common/fetch'
import {getRequestUrl} from '@/common'

const UserAPI = {
  getUserInfo (uid, token) {
    return service.post(getRequestUrl('/sys/user/info'), {
      uid,
      token
    })
  },
  loginByUsername (userName, password) {
    return service.post(getRequestUrl('/sys/user/login'), {
      userName,
      password
    })
  },
  logout (token) {
    return service.post(getRequestUrl('/sys/user/logout'), {token})
  }
}
export default UserAPI
