'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"/proxyApi"',
  USE_PROXY: true,
  PROXY_SERVER: '"https://www.easy-mock.com/mock/5b694978caf14f1551edd287/ura/"'
})
