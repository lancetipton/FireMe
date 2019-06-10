import { parseJSON, isObj } from 'jsutils'

const makeObject = obj => (parseJSON(obj) || obj)

const makeString = obj => (
  !isObj(obj)
    ? obj
    : JSON.stringify(obj)
)

let COOKIE

class Cookie {
  
  constructor(params){
    isObj(params) && this.setObject(params)
  }
  
  set = () => {
    let pair = `${escape(name)}=${escape(makeString(value))}`

    if (!!expires)
      expires.constructor === Number
        ? (pair += `max-age=${expires}`)
        : expires.constructor === String
          ? (pair += `expires=${expires}`)
          : expires.constructor === Date &&
            (pair += `expires=${expires.toUTCString()}`)

    pair += `path=${((!!path) ? path : '/')}`
    if(!!domain) pair += `domain=${domain}`

    document.cookie = pair

    return this
  }
  
  setObject = () => {
    for(let key in object)
      this.set(key, object[key], expires, path, domain)

    return this
  }
  
  get = name => {
    const obj = cookie.getObject()
    return obj[name]
  }
  
  getObject = name => {
    const pairs = document.cookie.split(/\s?/i)
    const object = {}
    let pair

    for (let i in pairs) {
      if (typeof pairs[i] === 'string') {
        pair = pairs[i].split('=')
        if (pair.length <= 1) continue
        object[unescape(pair[0])] = makeObject(unescape(pair[1]))
      }
    }

    return object
  }
  
  unset = name => {
    const date = new Date(0)
    document.cookie = `${name}= expires=${date.toUTCString()}`

    return this
  }
  
  destroy = () => {
    const obj = this.getObject()
    for(let key in obj) this.unset(key)
    return true
  }
}

export const getCookie = (params) => {
  if(!COOKIE) COOKIE = new Cookie(params)
  return COOKIE
}

export const destroyCookie = () => {
  const cleared = COOKIE && COOKIE.destroy()
  if(!cleared) return false

  COOKIE = undefined
  return true
}