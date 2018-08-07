import devEnv from '../../config/dev.env'

export function getRequestUrl (url) {
    return (devEnv.USE_PROXY ? '/proxyApi' : '') + url
}

export function hasPermission () {

}
