import { deepFreeze } from 'jsutils'
import { convertConst } from '../utils'

export const ActionTypes = deepFreeze(convertConst([
  'SET_USER',
  
  // Clean up firebase project
  'CLEAR_PROJECT',
  'CLEAR_PAGE',

  // DB events
  'DB_INIT',
  'DB_DOC_ADDED',
  'DB_DOC_CHANGED',
  'DB_DOC_REMOVED',
  'DB_AUTH_CHANGE',
  
  // Firestore Collection Actions
  'FS_SELECT_COLLECTION',
  
  // Firestore Doc Actions
  'FS_DB_INIT',
  'FS_SET_ACTIVE_DOC',
  'FS_UPDATE_COLLECTION',
  'FS_UPDATE_DOC',
  'FS_REMOVE_DOC',
  'FS_ADD_DOC',

  // Firestore Errors
  'FS_WATCH_DOCS_ERROR',
  'FS_WATCH_DOC_ERROR',
  'FS_GET_ERROR',
  'FS_UPDATE_ERROR',
  'FS_CREATE_ERROR',
  'FS_REMOVE_ERROR',
  
]))