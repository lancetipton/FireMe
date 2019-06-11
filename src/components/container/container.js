import React from 'react'
import { View } from 'react-native'
import { Paper } from 'material-bread'
import { withTheme } from 're-theme'

const Wrapper = props => {
  const cont = props.container || {}
  
  const container = {
    ...cont,
    style: {
      maxWidth: '90vw',
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
      minWidth: '90vw',
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