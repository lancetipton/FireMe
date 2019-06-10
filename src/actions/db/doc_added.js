import { getStore } from '../../store'
import { ActionTypes } from '../../constants'


export const docAdded = doc => {
  getStore().dispatch({
    type: ActionTypes.FS_ADD_DOC,
    collection: getCollection(doc.collection),
    doc,
  })
}