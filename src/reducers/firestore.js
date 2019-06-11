import { ActionTypes } from '../constants'
import { collections } from '../models/firebase/collections.json'
import { reduceColl, wordCaps } from 'jsutils'

const roots = reduceColl(collections, (key, id, org, rts) => {
  const split = id.split('-')
  rts[id] = { id: id, name: wordCaps(split[split.length -1]), icon: 'layer-group' }
  return rts
}, {})

const initialState = {
  collections: {},
  activeCollection: null,
  activeDoc: null,
  db: null,
  roots: roots,
}

const getCurCol = (collection, state) => state.collections[collection] || []

export function firestore(state = initialState, action) {
  switch (action.type) {

    case ActionTypes.CLEAR_PROJECT: {
      return {
        ...state,
        activeDoc: null,
      }
    }

    case ActionTypes.CLEAR_PAGE: {
      return {
        ...state,
        activeDoc: null,
      }
    }

    case ActionTypes.FS_DB_INIT: {
      return !action.db
        ? state
        : {
          ...state,
          db: action.db,
        }
    }

    case ActionTypes.FS_SELECT_COLLECTION: {
      return !action.collection
        ? state
        : {
          ...state,
          activeCollection: action.collection,
        }
    }

    case ActionTypes.FS_UPDATE_COLLECTION: {
      if (!action.docs) return state
      const updatedState = {
        ...state,
      }
      const collections = { ...updatedState.collections }
      collections[action.collection] = action.docs
      updatedState.collections = collections
      return updatedState
    }

    case ActionTypes.FS_REMOVE_DOC: {
      const { docId, collection } = action
      if (!docId || !collection) return state
      const curCollection = getCurCol(collection, state)
      return {
        ...state,
        collections: {
          ...state.collections,
          [collection]: curCollection.filter(curDoc => curDoc.uuid !== docId),
        },
      }
    }

    case ActionTypes.FS_ADD_DOC: {
      const { doc, collection } = action
      if (!doc || !collection) return state
      const curCollection = getCurCol(collection, state)
      const hasDoc = curCollection.find(curDoc => curDoc.uuid === doc.uuid)
      if (hasDoc) return state
      return {
        ...state,
        collections: {
          ...state.collections,
          [collection]: [ doc, ...curCollection ],
        },
      }
    }

    case ActionTypes.FS_UPDATE_DOC: {
      const { doc, collection } = action
      if (!doc || !collection) return state
      const curCollection = getCurCol(collection, state)
      return {
        ...state,
        collections: {
          ...state.collections,
          [collection]: curCollection.map(curDoc => {
            if (curDoc.uuid === doc.uuid) return doc
            return curDoc
          }),
        },
      }
    }

    case ActionTypes.FS_SET_ACTIVE_DOC: {
      if (!action.doc) return state
      return {
        ...state,
        activeDoc: action.doc,
      }
    }

    case ActionTypes.FS_WATCH_DOCS_ERROR:
    case ActionTypes.FS_WATCH_DOC_ERROR:
    case ActionTypes.FS_GET_ERROR:
    case ActionTypes.FS_UPDATE_ERROR:
    case ActionTypes.FS_CREATE_ERROR:
    case ActionTypes.FS_REMOVE_ERROR: {
      // Do something with the error here?
      return state
    }

    default: {
      return state
    }
  }
}
