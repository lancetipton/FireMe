import { ActionTypes } from '../constants'

const initialState = {
  repos: {},
  active: {},
}

export function user(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_ACTIVE_REPO: {
      if (!action.repoId) return state

      return {
        ...state,
        active: state.repos[action.repoId],
      }
    }
    case ActionTypes.SET_ACTIVE_REPO: {
      if (!action.repoId) return state

      return {
        ...state,
        active: state.repos[action.repoId],
      }
    }
    default: {
      return state
    }
  }
}
