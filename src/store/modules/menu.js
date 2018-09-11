import { SET_MENU_NAV_LIST, SET_PERMISSIONS, UPDATE_MENU_NAV_ACTIVE_NAME } from '../mutation-types'

// import Storage from '@/common/cache'
import SysMenuAPI from '@/api/menu'

const menu = {
  state: {
    menuNavActiveName: '',
    menuNavList: [],
    permissions: []
  },
  mutations: {
    [SET_MENU_NAV_LIST] (state, menuNavList) {
      state.menuNavList = menuNavList
    },
    [SET_PERMISSIONS] (state, permissions) {
      state.permissions = permissions
    },
    [UPDATE_MENU_NAV_ACTIVE_NAME] (state, menuNavActiveName) {
      state.menuNavActiveName = menuNavActiveName
    }
  },
  actions: {
    generateSidebarMenu ({commit}) {
      return new Promise(function(resolve, reject) {
        SysMenuAPI.list().then((res) => {
          if (res.code === 0) {
            commit('SET_MENU_NAV_LIST', res.data.menus)
            commit('SET_PERMISSIONS', res.data.permissions)
            resolve(res)
          } else {
            commit('SET_MENU_NAV_LIST', [])
            commit('SET_PERMISSIONS', [])
          }
        })
      })
    },
    updateMenuNavActiveName ({commit}, activeName) {
      commit('UPDATE_MENU_NAV_ACTIVE_NAME', activeName)
    }
  }
}

export default menu
