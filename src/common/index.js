import devEnv from '../../config/dev.env'

export default {
  getRequestUrl (url) {
    return (devEnv.USE_PROXY ? '/proxyApi' : '') + url
  }
}
