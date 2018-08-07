<template>
  <section class="sidebar">
    <el-menu
      class="sidebar-menu"
      mode="vertical"
      unique-opened
      :router="true"
      :default-active="menuNavActiveName"
      :collapse="isMenuCollapse">
      <sub-menu-nav
        v-for="menu in sidebarMenus"
        :key="menu.id"
        :menus='menu'>
      </sub-menu-nav>
    </el-menu>
  </section>
</template>

<script>
import SubMenuNav from './SubMenuNav.vue'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      maxWidth: 230
    }
  },
  components: { SubMenuNav },
  computed: {
    ...mapGetters([
      'sidebarMenus',
      'isMenuCollapse': sidebarCollapse,
      'tabsNavList'
    ]),
    menuNavActiveName: {
      get () {
        return this.$store.state.menu.menuNavActiveName
      },
      set (name) {
        this.$store.dispatch('updateMenuNavActiveName', name)
      }
    }
  },
  watch: {
    $route: 'routerHandler'
  },
  created () {
    this.$store.dispatch('generatorSidebarMenu').then(() => {
      this.routerHandler(this.$route)
    })
  },
  mounted () {
  },
  methods: {
    routerHandler (route) {
      if (hasPermission(route.name, this.sidebarMenus)) {
        return this.$router.push({path: '/401'})
      }
      if (route.meta && route.meta.isTab) {
        let tab = this.tabsNavList.filter(tab => tab.name === route.name)[0]
        if (isEmpty(tab)) {
          const menuNav = this.getMenuNavByRouteName(route.name, this.sidebarMenus)
          if (!isEmpty(menuNav)) {
            tab = {
              id: menuNav.id,
              name: route.name,
              title: menuNav.name,
              type: route.meta.type,
              path: menuNav.path,
              query: route.query
            }
            this.$store.dispatch('addTabsNavList', tab)
          } else {
            // return console.error('没有可用tab标签页!')
          }
        }
        this.menuNavActiveName = `${tab.id}`
        this.$store.dispatch('updateTabsActiveName', `${route.name}`)
      }
    },
    getMenuNavByRouteName (routeName, menuNavList) {
      let temp = []
      for (let i = 0; i < menuNavList.length; i++) {
        if (menuNavList[i].children && menuNavList[i].children.length >= 1) {
          temp = temp.concat(menuNavList[i].children)
        } else if (menuNavList[i].path === routeName) {
          return menuNavList[i]
        }
      }
      return temp.length >= 1 ? this.getMenuNavByRouteName(routeName, temp) : []
    }
  }
}
</script>
