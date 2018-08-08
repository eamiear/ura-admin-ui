import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import Storage from '@/common/cache' // 验权
import menuRouters from './modules'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: '/admin',
  scrollBehavior: () => ({ y: 0 }),
  routes: menuRouters
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (Storage.get('token') && Storage.get('uid')) { // 1.0. 是否已经完成登录
    to.path === '/login' ? next({path: '/'}) : next()
  } else {
    to.path.includes('/login') ? next() : next({path: '/login'})
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

export default router
