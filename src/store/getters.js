export default {
  token: state => state.user.token,
  uid: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  userInfo: state => state.user.userInfo,
  sidebarMenus: state => state.menu.menuNavList,
  permissions: state => state.menu.permissions,

  tabsNavList: state => state.tab.tabsNavList,
  tabsActiveName: state => state.tab.tabsActiveName,
  
  sidebarCollapse: state => state.sidebarCollapse,
  documentClientHeight: state => state.documentClientHeight
}
