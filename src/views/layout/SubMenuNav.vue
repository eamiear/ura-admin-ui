<template>
  <el-submenu
    v-if="menus.isShow && menus.children && menus.children.length > 0"
    :index="menus.id + ''">
    <template slot="title">
      <v-image v-if="menus.image" :source="menus.image"></v-image>
      <icon v-else-if='menus.icon' :name="menus.icon"></icon>
      <span slot="title" class="el-menu-item-title">{{menus.name}}</span>
      <template v-if="menus.labels && menus.labels.length > 0">
        <span class="pull-right-container pull-right" style="margin-right: 30px;">
          <small v-for="(label, labelIndex) in menus.labels" :key="labelIndex" class="label pull-right" :class="label.classes">{{label.text}}</small>
        </span>
      </template>
    </template>
    <sub-menu-nav
      v-for="item in menus.children"
      :key="item.id"
      :menus="item"></sub-menu-nav>
  </el-submenu>
  <el-menu-item
    :index="menus.id + ''"
    class='single-item'
    v-else-if="menus.isShow && (!menus.children || (menus.children && menus.children.length === 0))"
    @click="routerHandler(menus.url, $route)">
    <v-image v-if="menus.image" :source="menus.image" />
    <icon v-else-if='menus.icon' :name="menus.icon"></icon>
    <span slot="title" class="el-menu-item-title">{{menus.name}}</span>
    <template v-if="menus.labels && menus.labels.length > 0">
      <span class="pull-right-container">
        <small v-for="(label, labelIndex) in menus.labels" :key="labelIndex" class="label pull-right" :class="label.classes">{{label.text}}</small>
      </span>
    </template>
  </el-menu-item>
</template>

<script>
import SubMenuNav from './SubMenuNav.vue'
export default {
  name: 'SubMenuNav',
  props: {
    menus: Object | Array
  },
  components: {SubMenuNav},
  computed: {
  },
  methods: {
    routerHandler (path, preRoute) {
      const routeName = path
      if (/\S/.test(routeName)) {
        this.$router.push({name: routeName, query: {s: Date.now()}, params: {s: Date.now()}}, (to) => {
          to.matched && to.matched.length === 0 && this.$router.push({path: '/404'})
        })
      }
    }
  }
}
</script>
