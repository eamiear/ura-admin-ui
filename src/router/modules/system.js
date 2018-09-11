/**
 * Created by skz on 2018/6/15 14:27
 *
 * =================================
 *       系统平台-菜单路由配置
 * =================================
 *
 */

import _import from '@/router/import'

/* 权限管理 */
// const permission = [
//   {
//     'name': '/system/permission/permissionMgr.html',
//     'path': '/system/permission/permissionMgr',
//     desc: '权限管理',
//     'component': _import('system/permission/userPermission/index'),
//     meta: {isTab: true}
//   }, {
//     'name': '/system/permission/roleManager.html',
//     'path': '/system/permission/roleManager',
//     desc: '角色管理',
//     'component': _import('system/permission/roleManager/index'),
//     meta: {isTab: true}
//   }
// ]

const system = [
  {
    'name': '/system/menu.html',
    'path': '/system/menu',
    desc: '菜单管理',
    'component': _import('system/menu/index'),
    'meta': {isTab: true},
    'labels': "[{classes: 'bg-red',text: '5'}]"
  }, {
    'name': '/system/user.html',
    'path': '/system/user',
    desc: '用户管理',
    'component': _import('system/user'),
    meta: {isTab: true}
  }, {
    'name': '/system/dict.html',
    'path': '/system/dict',
    desc: '字典管理',
    'component': _import('system/dict'),
    meta: {isTab: true}
  }, {
    'name': '/system/config.html',
    'path': '/system/config',
    desc: '配置管理',
    'component': _import('system/config'),
    meta: {isTab: true}
  }, {
    'name': '/system/dept.html',
    'path': '/system/dept',
    desc: '部门管理',
    'component': _import('system/dept'),
    meta: {isTab: true}
  }
]

export default [
  ...system
]
