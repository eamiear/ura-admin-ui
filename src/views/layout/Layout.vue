<template>
	<section class="site-wrapper" :class="siteWrapperClasses">
		<aside class="main-sidebar">
      <brand></brand>
			<sidebar></sidebar>
		</aside>
		<section class="main-content content-wrapper" :style="siteContentWrapperStyles">
      <navbar></navbar>
      <article class="tabs-container app-main" v-if="!routeIsTab" :style="tabsViewStyles">
        <keep-alive v-if="routeIsKeepAlive">
          <router-view></router-view>
        </keep-alive>
        <router-view v-else></router-view>
      </article>
      <tabs-view v-else></tabs-view>
		</section>
	</section>
</template>

<script>
import Brand from '@/views/layout/Brand'
import Navbar from '@/views/layout/Navbar'
import Sidebar from '@/views/layout/Sidebar'
import { mapGetters } from 'vuex'

export default {
  name: 'layout',
  components: {
    Brand,
    Navbar,
    Sidebar
  },
  created () {
		this.getUserInfo()
  },
  mounted () {
		this.resetDocumentClientHeight()
    window.onresize = () => {
      this.resetDocumentClientHeight()
    }
  },
  computed: {
		...mapGetters([
			'sidebarCollapse',
			'documentClientHeight'
		]),
		siteWrapperClasses () {
			return {
				'sidebar-collapse': this.sidebarCollapse
			}
		},
		siteContentWrapperStyles () {
			return [
				{ 'minHeight': this.documentClientHeight + 'px' },
				{ 'height': this.documentClientHeight + 'px' }
			]
		},
		tabsViewStyles () {
			let height = this.documentClientHeight
			height -= 50 // content-wrapper：navbar
			height += 'px'
			return [
				{ minHeight: height },
				{ height: height }
			]
		},
		routeIsTab () {
			return this.$route.meta && this.$route.meta.isTab
		},
		routeIsKeepAlive () {
			return this.$route.meta && this.$route.meta.isKeepAlive
		}
  },
  methods: {
		resetDocumentClientHeight () {
			this.$store.dispatch('updateDocumentClientHeight', document.documentElement['clientHeight'])
		},
		getUserInfo () {
			this.$store.dispatch('getUserInfo')
		}
  }
}
</script>
