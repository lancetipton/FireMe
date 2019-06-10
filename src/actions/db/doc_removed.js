import { getStore } from '../../store'
import { ActionTypes } from '../../constants'

export const docRemoved = ({ single, collection, docId, ...data }) => {
  docId = single ? docId : data.uuid

  getStore().dispatch({
    type: ActionTypes.FS_REMOVE_DOC,
    collection,
    docId,
  })
}