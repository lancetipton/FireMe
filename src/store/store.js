import { combineReducers, createStore } from 'redux'
import * as reducers from '../reducers'
import { ActionTypes } from '../constants' 

const isDEV = process.env.NODE_ENV === 'development'
const appReducers = combineReducers(reducers)

const rootReducer = (state, action) => {
  if (action.type === ActionTypes.LOGOUT) {
    state = undefined
  }
  return appReducers(state, action)
}

export const initializeStore = () => {
  const reDuxTools = !isDEV &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()

  return createStore(
    rootReducer,
    reDuxTools || undefined,
  )
}

const getStore = () => {
  return typeof window === 'undefined'
    ? global.reduxStore
    : window.parent.reduxStore
}

export default getStore
