import { getStore } from '../../store'
import { getState } from '../../utils'
import { ActionTypes } from '../../constants'


export const docChanged = doc => {
  if (!doc.collection) return
  const collection = doc.collection
  const curDocs = getState('firestore').collections[collection]

  if (!curDocs) return
  const curDoc = curDocs.find(({ uuid }) => uuid === doc.uuid)
  if (!curDoc || curDoc.updated_at >= doc.updated_at) return
  getStore().dispatch({
    type: ActionTypes.FS_UPDATE_DOC,
    collection,
    doc,
  })
}