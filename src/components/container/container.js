import React from 'react'
import { View } from 'react-native'
import { Paper, withTheme } from 'material-bread'

const Wrapper = props => {
  const cont = props.container || {}
  
  const container = {
    ...cont,
    style: {
      maxWidth: '90%',
      display: "block",
      margin: "auto",
      ...(cont.style),
    }
  }
  
  const pap = props.paper || {}
  const paper = {
    ...pap,
    shadow: pap.shadow || 5,
    style: {
      padding: 10,
      ...pap.style,
    }
  }
  
  return (
    <View { ...container } >
      <Paper { ...paper } >
        { props.children }
      </Paper>
    </View>
  )
}

export const Container = withTheme(Wrapper)