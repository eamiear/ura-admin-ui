import service from '@/common/fetch'
import Common from '@/common'

const API = {
  getSysMenuList (params) {
    return service.get(Common.getRequestUrl('/sys/menu/list'), {params})
  }
}
export default API
