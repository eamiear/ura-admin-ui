/**
 * Created by skz on 2017/10/10 18:03
 * Common Method
 */
var _toString = Object.prototype.toString

export const Helper = {
  isUndef: function (v) {
    return v === undefined || v === null
  },
  isDef: function (v) {
    return v !== undefined && v !== null
  },
  isTrue: function (v) {
    return v === true
  },
  isFalse: function (v) {
    return v === false
  },
  /**
   * Check if value is primitive
   */
  isPrimitive: function (value) {
    return (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    )
  },
  /**
   * Quick object check - this is primarily used to tell
   * Objects from primitive values when we know the value
   * is a JSON-compliant type.
   */
  isObject: function (obj) {
    return obj !== null && typeof obj === 'object'
  },
  isString: function (str) {
    return typeof str === 'string'
  },
  /**
   * Strict object type check. Only returns true
   * for plain JavaScript objects.
   */
  isPlainObject: function (obj) {
    return _toString.call(obj) === '[object Object]'
  },
  isArray: function (arr) {
    return _toString.call(arr) === '[object Array]'
  },
  isRegExp: function (v) {
    return _toString.call(v) === '[object RegExp]'
  },
  /**
   * Check if val is a valid array index.
   */
  isValidArrayIndex: function (val) {
    var n = parseFloat(val)
    return n >= 0 && Math.floor(n) === n && isFinite(val)
  },
  /**
   * Convert a value to a string that is actually rendered.
   */
  toString: function (val) {
    return val == null
      ? ''
      : typeof val === 'object'
        ? JSON.stringify(val, null, 2)
        : String(val)
  },
  /**
   * Convert a input value to a number for persistence.
   * If the conversion fails, return original string.
   */
  toNumber: function (val) {
    var n = parseFloat(val)
    return isNaN(n) ? val : n
  },
  /**
   * Make a map and return a function for checking if a key
   * is in that map.
   */
  makeMap: function (str, expectsLowerCase) {
    var map = Object.create(null)
    var list = str.split(',')
    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true
    }
    return expectsLowerCase
      ? function (val) { return map[val.toLowerCase()] }
      : function (val) { return map[val] }
  },
  sort: function (val) {
    const keys = Object.keys(val).sort()
    let sortParam = {}
    keys.forEach((key, index) => {
      sortParam[key] = val[key]
    })
    return sortParam
  },
  deepSort: function (params) {
    for (let k in params) {
      if (this.isArray(params[k])) { // 数组
        for (let i = 0; i < params[k].length; i++) {
          if (this.isObject(params[k][i])) {
            params[k][i] = this.deepSort(params[k][i])
          }
        }
      } else if (this.isObject(params[k])) { // JSON
        params[k] = this.deepSort(params[k])
      }
    }
    return this.sort(params)
  },
  parseTime: function (time, fmt) {
    let date
    fmt = fmt || 'yyyy-MM-dd hh:mm:ss'
    date = this.isObject(time) ? time : new Date(time)
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k])
          : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  },
  parseNumberToChinese: function (number) {
    return {
      0: '零',
      1: '一',
      2: '二',
      3: '三',
      4: '四',
      5: '五',
      6: '六',
      7: '七',
      8: '八',
      9: '久'
    }[number]
  },
  bytesToSize: function (bytes) {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return (bytes / Math.pow(k, i)) + ' ' + sizes[i]
  },
  sizeToBytes: function (size) {
    if (!size) return 0
    const k = 1024
    const bytes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let unit = size.match(/[a-z|A-Z]+$/gi)[0].toUpperCase()
    let number = +(size.match(/^\d+/gi)[0] || 0)
    const p = bytes.indexOf(unit)
    return number * Math.pow(k, p)
  },
  log: function () {
    const msg = '[Logger] ' + Array.prototype.join.call(arguments, ' ')
    if (process.env.NODE_ENV === 'development') {
      if (window.console && window.console.log) {
        window.console.log(msg)
      } else if (window.opera && window.opera.postError) {
        window.opera.postError(msg)
      }
    }
  },
  getByteLen (val) {
    // let len = 0
    // for (let i = 0; i < val.length; i++) {
    //   if (val[i].match(/[\x00-\xff]/ig) != null) {
    //     len += 1
    //   } else { len += 0.5 }
    // }
    // return Math.floor(len)
  },
  shorten (text, totalLength) {
    let ret = text
    if (ret.length > totalLength) {
      ret = ret.substr(0, totalLength - 3) + '...'
    }
    return ret
  },
  deepClone (source) {
    if (!source && typeof source !== 'object') {
      throw new Error('error arguments', 'shallowClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    for (const keys in source) {
      if (source.hasOwnProperty(keys)) {
        if (source[keys] && typeof source[keys] === 'object') {
          targetObj[keys] = source[keys].constructor === Array ? [] : {}
          targetObj[keys] = this.deepClone(source[keys])
        } else {
          targetObj[keys] = source[keys]
        }
      }
    }
    return targetObj
  },
  debounce (func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function () {
      // 据上一次触发时间间隔
      const last = +new Date() - timestamp

      // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
        if (!immediate) {
          result = func.apply(context, args)
          if (!timeout) context = args = null
        }
      }
    }

    return function (...args) {
      context = this
      timestamp = +new Date()
      const callNow = immediate && !timeout
      // 如果延时不存在，重新设定延时
      if (!timeout) timeout = setTimeout(later, wait)
      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }

      return result
    }
  },
  toggleClass (element, className) {
    if (!element || !className) {
      return
    }
    let classString = element.className
    const nameIndex = classString.indexOf(className)
    if (nameIndex === -1) {
      classString += ' ' + className
    } else {
      classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
    }
    element.className = classString
  },
  scrollTo (element, to, duration) {
    if (duration <= 0) return
    const difference = to - element.scrollTop
    const perTick = difference / duration * 10
    setTimeout(() => {
      console.log(new Date())
      element.scrollTop = element.scrollTop + perTick
      if (element.scrollTop === to) return
      this.scrollTo(element, to, duration - 10)
    }, 10)
  },
  objectMerge (target, source) {
    /* Merges two  objects,
     giving the last one precedence */

    if (typeof target !== 'object') {
      target = {}
    }
    if (Array.isArray(source)) {
      return source.slice()
    }
    for (const property in source) {
      if (source.hasOwnProperty(property)) {
        const sourceProperty = source[property]
        if (typeof sourceProperty === 'object') {
          target[property] = this.objectMerge(target[property], sourceProperty)
          continue
        }
        target[property] = sourceProperty
      }
    }
    return target
  },
  html2Text (val) {
    const div = document.createElement('div')
    div.innerHTML = val
    return div.textContent || div.innerText
  },
  param2Obj (url) {
    const search = url.split('?')[1]
    if (!search) {
      return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
  },
  param (json) {
    if (!json) return ''
    return this.cleanArray(Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' +
        encodeURIComponent(json[key])
    })).join('&')
  },
  cleanArray (actual) {
    const newArray = []
    for (let i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i])
      }
    }
    return newArray
  },
  getQueryObject (url) {
    url = url == null ? window.location.href : url
    const search = url.substring(url.lastIndexOf('?') + 1)
    const obj = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
      const name = decodeURIComponent($1)
      let val = decodeURIComponent($2)
      val = String(val)
      obj[name] = val
      return rs
    })
    return obj
  },
  formatTime (time, option) {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
      return '刚刚'
    } else if (diff < 3600) { // less 1 hour
      return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
      return '1天前'
    }
    if (option) {
      return this.parseTime(time, option)
    } else {
      return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    }
  },
  // parseTime (time, cFormat) {
  //   if (arguments.length === 0) {
  //     return null
  //   }
  //   const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  //   let date
  //   if (typeof time === 'object') {
  //     date = time
  //   } else {
  //     if (('' + time).length === 10) time = parseInt(time) * 1000
  //     date = new Date(time)
  //   }
  //   const formatObj = {
  //     y: date.getFullYear(),
  //     m: date.getMonth() + 1,
  //     d: date.getDate(),
  //     h: date.getHours(),
  //     i: date.getMinutes(),
  //     s: date.getSeconds(),
  //     a: date.getDay()
  //   }
  //   const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
  //     let value = formatObj[key]
  //     if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
  //     if (result.length > 0 && value < 10) {
  //       value = '0' + value
  //     }
  //     return value || 0
  //   })
  //   return time_str
  // },
  getRouteNameByUrl (url) {
    const val = /.*\/(.*)\.html/.exec(url)
    return val && val.length >= 1 ? val[1] : ''
  },
  getRequest (name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    const path = window.location.href
    const r = path.slice(path.indexOf('?') + 1).match(reg)
    return (r && r.length) && r[2]
  },
  isLowerCase (str) {
    return /^[a-z]+$/.test(str)
  },
  isUpperCase (str) {
    return /^[A-Z]+$/.test(str)
  },
  // 是否字母
  isAlphabets (str) {
    return /^[A-Za-z]+$/.test(str)
  },
  isTelephone (str) {
    return /^(([0+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
  },
  isMobilephone (str) {
    return /^(1[3-9])\d{9}|((5[1-69])|9[0-8])\d{6}|6\d{7}$/
  }
}

