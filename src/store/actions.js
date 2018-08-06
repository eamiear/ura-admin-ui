export default {
  switchSidebarCollapse ({commit}, sidebarCollapse) {
      commit('SWITCH_SIDEBAR_COLLAPSE', sidebarCollapse)
    },
    updateDocumentClientHeight ({commit}, height) {
      commit('UPDATE_DOCUMENT_CLIENT_HEIGHT', height)
    }
}
