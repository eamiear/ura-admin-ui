import service from '@/common/fetch'
// import {getRequestUrl} from '@/common'

const UserAPI = {
  getUserInfo (uid) {
    return service.post('/sys/user/info', {
      userId: uid
    })
  }
}
export default UserAPI
