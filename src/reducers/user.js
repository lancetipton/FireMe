import { ActionTypes } from '../constants'

const initialState = {
  name: '',
  email: '',
  authorized: false,
}

export function user(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_USER: {
      if (!action.user) return state

      return {
        ...state,
        ...action.user
      }
    }
    default: {
      return state
    }
  }
}
