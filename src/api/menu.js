import service from '@/common/fetch'

const SysMenuAPI = {
  getSysMenuList (params) {
    return service.get('/sys/menu/list', params)
  },
  createMenu () {
    return service.get('/sys/menu/list')
  },
  editMenu () {

  },
  deleteMenu () {

  },
  showMenu () {

  },
  getParentMenuList () {

  }
}
export default SysMenuAPI
