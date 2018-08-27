import service from '@/common/fetch'
// import {getRequestUrl} from '@/common'

const SysMenuAPI = {
  getSysMenuList (params) {
    return service.get('/sys/menu/list', {params})
  }
}
export default SysMenuAPI
