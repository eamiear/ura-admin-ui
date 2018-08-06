<template>
  <section class="sidebar">
    <el-menu
      class="sidebar-menu"
      mode="vertical"
      unique-opened
      :router="true"
      :default-active="$route.path"
      :collapse="isMenuCollapse">
      <sub-menu-nav
        v-for="menu in sidebar_menus"
        :key="menu.id"
        :menus='menu'>
      </sub-menu-nav>
    </el-menu>
  </section>
</template>

<script>
import SubMenuNav from './SubMenuNav.vue'
import {routes} from '@/router'
export default {
  data () {
    return {
      sidebar_menus: routes,
      maxWidth: 230
    }
  },
  components: { SubMenuNav },
  computed: {
    isMenuCollapse () {
      return false
    },
    menuNavActiveName: {
      get () {
        // return this.$store.state.menu.menuNavActiveName
        return ''
      },
      set (name) {
        // this.$store.dispatch('updateMenuNavActiveName', name)
      }
    }
  },
  watch: {
    $route: 'routerHandler'
  },
  created () {
    // this.routerHandler(this.$route)
  },
  mounted () {

  },
  methods: {
    routerHandler (route) {
      if (route.meta && route.meta.isTab) {
        // let tab = this.$store.state.tab.tabsNavList.filter(tab => tab.name === route.name)[0]
        // if (isEmpty(tab)) {
        //   const menuNav = this.getMenuNavByRouteName(route.name, this.sidebar_menus)
        //   if (!isEmpty(menuNav)) {
        //     tab = {
        //       id: menuNav.id,
        //       name: route.name,
        //       title: menuNav.name,
        //       type: route.meta.type,
        //       path: menuNav.path,
        //       query: route.query
        //     }
        //     this.$store.dispatch('addTabsNavList', tab)
        //   } else {
        //     // return console.error('没有可用tab标签页!')
        //   }
        // }
        // this.menuNavActiveName = `${tab.id}`
        // this.$store.dispatch('updateTabsActiveName', `${route.name}`)
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
