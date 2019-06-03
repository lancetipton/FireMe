import { ActionTypes } from '../constants'
import { getCookie } from '../services/cookie'
const storedCookie = getCookie()


const initialState = {
  ...storedCookie.getObject(),
}

export function cookie(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_COOKIE: {
      if (!action.cookie) return state

      return {
        ...state,
        ...action.cookie
      }
    }
    default: {
      return state
    }
  }
}
