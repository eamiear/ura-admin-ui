import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import menu from './modules/menu'
import tab from './modules/tab'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  sidebarCollapse: false,
  documentClientHeight: 0
}

const store = new Vuex.Store({
  modules: {
    user,
    menu,
    tab
  },
  state,
  getters,
  mutations,
  actions
})

export default store
