import { getStore } from '../../store'

export const getState = (which = '') => {
  const state = getStore().getState()
  return which ? state[which] : state
}