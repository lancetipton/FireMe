import { getStore } from '../../store'
import { ActionTypes } from '../../constants'

export const getDocs = async (collection, db) => {
  // IF no collection just auto-return
  if(!collection) return null
  
  const store = getStore()
  // Get the current state of firestore reducer
  const { firestore } = store.getState()
  // If no firestore || we already have the collections docs, just return 
  if(!firestore || firestore.collections[collection.id])
    return

  // Ensure we have the DB to load the collections docs
  if(!db){
    db = firestore.db
    if(!db) return console.warn(`Database could not be loaded!`)
  }

  const docs = await db.getDocs(collection.id)

  store.dispatch({
    type: ActionTypes.FS_UPDATE_COLLECTION,
    collection: collection.id,
    docs: docs || []
  })

}
