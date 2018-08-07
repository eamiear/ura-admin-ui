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
const permission = [
  {
    'name': '/system/permission/permissionMgr.html',
    'path': '/system/permission/permissionMgr',
    desc: '权限管理',
    'component': _import('system/permission/userPermission/index'),
    meta: {isTab: true}
  }, {
    'name': '/system/permission/roleManager.html',
    'path': '/system/permission/roleManager',
    desc: '角色管理',
    'component': _import('system/permission/roleManager/index'),
    meta: {isTab: true}
  }
]

/* 业务事件 */
const bizevent = [
  {
    'name': '/system/bizevent/bizeventList.html',
    'path': '/system/bizevent/bizeventList',
    desc: '事件列表',
    'component': _import('system/bizevent/event/bizeventList'),
    meta: {isTab: true}
  }, {
    'name': '/system/bizevent/addEventParam.html',
    'path': '/system/bizevent/addEventParam',
    desc: '新增/编辑事件',
    'component': _import('system/bizevent/event/addEventParam'),
    meta: {isTab: true}
  }, {
    'name': '/system/bizevent/eventConf.html',
    'path': '/system/bizevent/eventConf',
    desc: '配置事件',
    'component': _import('system/bizevent/eventParam/paramConfig'),
    meta: {isTab: true}
  }
]

/* 优惠券 */
const coupon = [
  {
    'name': '/system/coupon/batch.html',
    'path': '/system/coupon/batch',
    desc: '优惠券批次',
    'component': _import('system/coupon/batch'),
    meta: {isTab: true}
  }, {
    'name': '/system/coupon/list.html',
    'path': '/system/coupon/list',
    desc: '优惠券查询',
    'component': _import('system/coupon/list'),
    meta: {isTab: true}
  }
]

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
    'component': _import('system/user/index'),
    meta: {isTab: true}
  }, {
    'name': '/system/comments.html',
    'path': '/system/comments',
    desc: '评论管理',
    'component': _import('system/comments/index'),
    meta: {isTab: true}
  }, {
    'name': '/system/dict.html',
    'path': '/system/dict',
    desc: '字典管理',
    'component': _import('system/dict/index'),
    meta: {isTab: true}
  }, {
    'name': '/system/application.html',
    'path': '/system/application',
    desc: '应用管理',
    'component': _import('system/application/index'),
    meta: {isTab: true}
  }, {
    'name': '/system/picture.html',
    'path': '/system/picture',
    desc: '图库管理',
    'component': _import('system/picture/index'),
    meta: {isTab: true}
  }, {
    'name': '/system/feedback.html',
    'path': '/system/feedback',
    desc: '用户反馈信息',
    'component': _import('system/feedback/list'),
    meta: {isTab: true}
  }, {
    'name': '/system/interfaceInfo.html',
    'path': '/system/interfaceInfo',
    desc: '接口管理',
    'component': _import('system/interfaceInfo/index'),
    meta: {isTab: true}
  }
]

export default [
  ...system,
  ...permission,
  ...bizevent,
  ...coupon
]
