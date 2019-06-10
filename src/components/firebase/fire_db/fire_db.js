import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { selectCollection } from '../../../actions'
import { checkCall } from 'jsutils'
import { withTheme, ProgressBar } from 'material-bread';
import { CollectionList, H6 } from '../../'

const onCollectionPress = function(item, props){
  checkCall(selectCollection, item)
}

const showRootCollections = (props) => {
  const { roots } =  props
  return (
    <CollectionList
      items={ roots }
      onPress={ onCollectionPress }
      header={{
        content: "Root Collections"
      }}
    />
  )
}

const onDocPress = function(item, props){
  console.log(`---------- item ----------`)
  console.log(item)
  // checkCall(selectCollection, item)
}

const formatDoc = (id, doc, props) => {
  const item = {  ...doc, icon: 'file-code' }
  return item
}

const showCollectionDocs = props => {
  const { docs, activeCollection } =  props
  const progVisible = !docs
  return (
    progVisible && (
      <View style={{ minWidth: "80vw" }} >
        <H6 style={{ textAlign: 'center', marginTop: 25, marginBottom: 25 }} >
          Loading Docs...
        </H6>
        <ProgressBar visible />
      </View>
    ) || (
      <CollectionList
        items={ docs }
        beforeBuildRow={ formatDoc }
        onPress={ onDocPress }
        header={{
          content: `${activeCollection.name} Docs`,
          icon: {
            name: 'layer-group'
          }
        }}
      />
    )
  )
}

export const DBViewer = (props) => {
  return !props.activeCollection && showRootCollections(props) || showCollectionDocs(props)
}

export const FireDb = withTheme(
  connect(({ firestore }) => ({
    roots: firestore.roots,
    activeCollection: firestore.activeCollection,
    docs: firestore.collections[ firestore.activeCollection && firestore.activeCollection.id ],
  }))(DBViewer)
)