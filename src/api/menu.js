import service from '@/common/fetch'

const SysMenuAPI = {
  list (params) {
    return service.get('/sys/menu/list', params)
  },
  save () {
    return service.get('/sys/menu/list')
  },
  info (menuId) {
    return service.get(`/sys/menu/info/${menuId}`)
  },
  deleteMenu () {

  },
  showMenu () {

  },
  select () {
    return service.get('/sys/menu/select')
  }
}
export default SysMenuAPI
