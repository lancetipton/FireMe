import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Button, withTheme } from 'material-bread';
import { H4, P, Icon, Modal } from '../../'

const FBCollections = () => {
  
}



export const Collections = withTheme(
  connect(({ user }) => ({
    user
  }))(FBCollections)
)
