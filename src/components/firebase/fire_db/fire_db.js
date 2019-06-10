import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Button, withTheme } from 'material-bread';
import { H4, P, Icon, Modal, CollectionList } from '../../'


const buildRow = (item, props) => {
  
}

export const DBViewer = (props) => {
  const { roots } =  props.firestore
  
  return (<CollectionList items={ roots } headerText={ "Root Collections" } />)
}

export const FireDb = withTheme(
  connect(({ firestore }) => ({
    firestore
  }))(DBViewer)
)