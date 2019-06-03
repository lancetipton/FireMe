import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

/**
 * Builds a FontAwesome Icon
 * @param { object } props
 * @param { string } props.name
*/
export const Icon = props => {
  if(!props.name) return
  const { type, old, ...params } = props

  return old
    ? (<FontAwesome { ...params } />)
    : type === 'brand' || type === 'brands'
      ? (<FontAwesome5 { ...params } brand />)
      : type === 'regular' || type === 'reg'
        ? (<FontAwesome5 { ...params } />)
        : (<FontAwesome5 { ...params } solid />)
}