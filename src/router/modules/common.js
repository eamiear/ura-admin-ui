/**
 * Created by skz on 2018/6/15 15:18
 *
 * =================================
 *       通用菜单路由配置
 * =================================
 */
import _import from '@/router/import'
export default [
  {
    'name': '/401',
    'path': '/401',
    desc: '401',
    'component': _import('error/401')
  }, {
    'name': '/404',
    'path': '/404',
    desc: '404页面',
    'component': _import('error/404')
  }
]
