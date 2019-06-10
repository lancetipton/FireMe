import React from 'react'
import { View } from 'react-native'
import { Paper } from 'material-bread'

export const Container = props => {
  return (
    <View 
      style={{
        maxWidth: '90%',
        display: "block",
        margin: "auto",
      }}
    >
      <Paper>
        { props.children }
      </Paper>
    </View>
  )
}