import { getStore } from '../../store'
import { ActionTypes } from '../../constants'
import { FBService } from '../../services'
import FBConfig from '../../models/firebase/fb_config.js'

export const dbInit = async () => {
  
  const firebase = new FBService(true, FBConfig)
  await firebase.initialize()

  getStore().dispatch({
    type: ActionTypes.FS_DB_INIT,
    firebase
  })
  
}