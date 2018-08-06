import {SWITCH_SIDEBAR_COLLAPSE, UPDATE_DOCUMENT_CLIENT_HEIGHT} from './mutation-types'

export default {
  [SWITCH_SIDEBAR_COLLAPSE] (state, sidebarCollapse) {
    state.sidebarCollapse = sidebarCollapse
  },
  [UPDATE_DOCUMENT_CLIENT_HEIGHT] (state, height) {
    state.documentClientHeight = height
  }
}
