import { getStore } from '../../store'
import { ActionTypes } from '../../constants'
import { getDocs } from '../doc'
export const selectCollection = async (collection) => {
  const store = getStore()
  const { firestore: { db } } = store.getState()

  store.dispatch({
    type: ActionTypes.FS_SELECT_COLLECTION,
    collection
  })

  getDocs(collection, db)
}