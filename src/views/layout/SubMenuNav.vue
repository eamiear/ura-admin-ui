<template>
  <el-submenu
    v-if="menus.isShow && menus.children && menus.children.length > 0"
    :index="menus.id + ''">
    <template slot="title">
      <img v-if="menus.image" :src="menus.image"/>
      <i v-else-if='menus.icon' :class="'fa fa-' + menus.icon"></i>
      <span slot="title" class="el-menu-item-title">{{menus.name}}</span>
      <template v-if="menus.labels && menus.labels.length > 0">
        <span class="pull-right-container pull-right" style="margin-right: 30px;">
          <small v-for="(label,key) in menus.labels" :key="key" class="label pull-right" :class="label.classes">{{label.text}}</small>
        </span>
      </template>
    </template>
    <sub-menu-nav
      v-for="item in menus.children"
      :key="item.id"
      :menus="item"></sub-menu-nav>
  </el-submenu>
  <el-menu-item
    :index="menus.path"
    :route="menus"
    class='single-item'
    v-else-if="menus.isShow && (!menus.children || (menus.children && menus.children.length === 0))">
    <img v-if="menus.image" :src="menus.image"/>
    <i v-else-if='menus.icon' :class="'fa fa-' + menus.icon"></i>
    <span slot="title" class="el-menu-item-title">{{menus.name}}</span>
    <template v-if="menus.labels && menus.labels.length > 0">
      <span class="pull-right-container">
        <small v-for="(label,key) in menus.labels" :key="key" class="label pull-right" :class="label.classes">{{label.text}}</small>
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

  }
}
</script>
