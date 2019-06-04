import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Button, withTheme } from 'material-bread';
import { H4, P, Icon, Modal } from '../'

const initGitAuth = () => {
  console.log(`---------- init auth here ----------`)
}

const authLogin = (props, modalState) => {  
  
  return (
    <View>
      <H4>
        GitHub
      </H4>
      <P>
        Please allow access to your github account.
      </P>
      <Button
        icon={ <Icon  name="github" old={ true } size={ 20 }  /> }
        text={ 'Authorize Account' }
        type="contained"
        onPress={ initGitAuth }
      />
    </View>
  )
}

const AuthComp = (props) => {
  return (!props.user || !props.user.authorized) && (
    <Modal { ...props } getComponent={ authLogin } isOpen={ !props.user.authorized } />
  )
}


export const Auth = withTheme(
  connect(({ user }) => ({
    user
  }))(AuthComp)
)
