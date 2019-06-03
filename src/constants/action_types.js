import { deepFreeze } from 'jsUtils'

export const ActionTypes = deepFreeze({
  SET_ACTIVE_REPO: 'SET_ACTIVE_REPO',
  SET_REPOS: 'SET_REPOS',
  SET_USER: 'SET_USER',
})