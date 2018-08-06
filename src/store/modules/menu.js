import { SET_MENU_NAV_LIST, SET_PERMISSIONS, UPDATE_MENU_NAV_ACTIVE_NAME } from '../mutation-types'
const menu = {
  state: {
    menuNavActiveName: '',
    menuNavList: [],
    permissions: []
  },
  mutations: {
    [SET_MENU_NAV_LIST] (state, {menuNavList}) {
      state.menuNavList = menuNavList
    },
    [SET_PERMISSIONS] (state, {permissions}) {
      state.permissions = permissions
    },
    [UPDATE_MENU_NAV_ACTIVE_NAME] (state, {menuNavActiveName}) {
      state.menuNavActiveName = menuNavActiveName
    }
  },
  actions: {
    generateSidebarMenus ({commit}) {
      return new Promise(function(resolve, reject) {

      });
    },
    updateMenuNavActiveName ({commit}, {activeName}) {
      commit('UPDATE_MENU_NAV_ACTIVE_NAME', {activeName})
    }
  }
}

export default menu
