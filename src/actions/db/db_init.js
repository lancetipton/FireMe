import { getStore } from '../../store'
import { ActionTypes } from '../../constants'
import { FSService } from '../../services'
import FBConfig from '../../models/firebase/fb_config.js'

export const dbInit = async () => {
  
  const db = new FSService(true, FBConfig)
  await db.initialize()

  getStore().dispatch({
    type: ActionTypes.FS_DB_INIT,
    db
  })
  
}