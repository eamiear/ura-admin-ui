import service from '@/common/fetch'

const SysMenuAPI = {
  list (params) {
    return service.get('/sys/menu/list', params)
  },
  create (params) {
    return service.post({
      url: '/sys/menu/save',
      data: params,
      json: true
    })
  },
  update (params) {
    return service.post({
      url: '/sys/menu/update',
      data: params,
      json: true
    })
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
