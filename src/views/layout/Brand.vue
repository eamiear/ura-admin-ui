<template>
  <a href="#" class="brand">
    <span class="brand-label" :style="styleObject">管理平台</span>
  </a>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'brand',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'sidebarCollapse'
    ]),
    styleObject () {
      return {display: this.sidebarCollapse ? 'none' : ''}
    }
  },
  methods: {}
}
</script>
