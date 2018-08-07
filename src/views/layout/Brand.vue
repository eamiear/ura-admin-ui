<template>
  <a href="#" class="brand">
    <span class="brand-label" :style="styleObject">代码生成器</span>
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
      'isMenuCollapse': sidebarCollapse
    ]),
    styleObject () {
      return {display: this.isMenuCollapse ? 'none' : ''}
    }
  },
  methods: {}
}
</script>
