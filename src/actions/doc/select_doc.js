import { getStore } from '../../store'
import { ActionTypes } from '../../constants'

export const selectDoc = doc => {
  const store = getStore()
  
  store.dispatch({
    type: ActionTypes.FS_SET_ACTIVE_DOC,
    doc
  })
}