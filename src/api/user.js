import service from '@/common/fetch'
// import {getRequestUrl} from '@/common'

const UserAPI = {
  getUserInfo (uid) {
    return service.get(`/sys/user/info/${uid}`)
  }
}
export default UserAPI
