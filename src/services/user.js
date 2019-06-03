import { checkCall } from 'jsUtils'
import { getCookie } from './cookie'
import Url from 'url'

class User {
  constructor(){
    this.cookie = getCookie()
  }

  authenticate = async params => {
    if (this.cookie.get('oauth-token'))
      return checkCall(params.success)

    const parsed = url.parse(window.location.href, true);
    const code = parsed.query && parsed.query.code;
    if(!code)
      return checkCall(params.error)
    
    const response = await axios.get(auth.url + '/authenticate/' + code)
    if(!response.token)
      return checkCall(params.error)
      
    this.cookie.set('oauth-token', response.token)
    const url = new Url(window.location.href)
    
    window.location.href = url.format()
    
    return checkCall(params.success)
  }

  url = (userId) => {
    const id = this.cookie.get('id');
    const token = this.cookie.get('oauth-token');
    const noId = id === undefined || id === null || id === ''

    return auth.api + ( 
      token && noId || (id && userId === id)
        ? '/user'
        : '/users/login'
    )
  }

}