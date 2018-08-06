<template>
	<section class="site-wrapper">
		<aside class="main-sidebar">
      <brand></brand>
			<sidebar></sidebar>
		</aside>
		<section class="main-content content-wrapper">
      <navbar></navbar>
      <article class="app-main">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </article>
		</section>
	</section>
</template>

<script>
import Brand from '@/views/layout/Brand'
import Navbar from '@/views/layout/Navbar'
import Sidebar from '@/views/layout/Sidebar'
export default {
  name: 'layout',
  components: {
    Brand,
    Navbar,
    Sidebar
  },
  created () {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
  }
}
</script>
