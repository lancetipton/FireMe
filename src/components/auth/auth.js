import React from 'react'
import { View, Text } from 'react-native'
import { Modal } from  '../modal'

const authLogin = () => {
  return (
    <View>
      <Text>
        Auth Login Modal
      </Text>
    </View>
  )
}

export const Auth = (props) => {
  return (!props.user || !props.user.authorized) && (
    <Modal getComponent={ authLogin } status={ true } />
  )
}