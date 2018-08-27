/**
 * Created by skz on 2018/6/15 15:24
 *
 * 菜单配置出口
 *
 */
import system from './system'
import common from './common'
import _import from '@/router/import'

const menuRoutes = {
  name: 'home',
  path: '/',
  desc: '首页',
  component: _import('layout/Layout'),
  redirect: {path: '/dashboard'},
  children: [
    {
      'name': 'dashboard',
      'path': '/dashboard',
      desc: '首页面板',
      'component': _import('dashboard/index'),
      meta: {isTab: true}
    },
    ...system,
    ...common
  ]
}

export default [
  {
    'name': 'login',
    'path': '/login',
    desc: '登录页',
    'component': _import('login/index')
  },
  menuRoutes,
  { path: '*', redirect: '/404' }
]
