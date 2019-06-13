import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { selectCollection, selectDoc } from '../../../actions'
import { checkCall, wordCaps } from 'jsutils'
import { ProgressBar } from 'material-bread'
import { withTheme } from 're-theme'
import { List, H6 } from '../../'
import { JTree } from '../../jTree'

const onCollectionPress = function(item, props){
  checkCall(selectCollection, item)
}

const showRootCollections = (props) => {
  const { roots } =  props
  return (
    <List
      items={ roots }
      onPress={ onCollectionPress }
      header={{
        content: {
          text: "Root Collections",
        }
      }}
    />
  )
}

const onDocPress = function(item, props){
  selectDoc(item)
}

const formatDoc = (id, doc, props) => {
  return {  ...doc, name: wordCaps(doc.name), icon: 'file-code' }
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
      <List
        items={ docs }
        beforeBuildRow={ formatDoc }
        onPress={ onDocPress }
        header={{
          content: {
            text: `${activeCollection.name} Docs`,
          },
          icon: {
            name: 'layer-group'
          }
        }}
      />
    )
  )
}


const showActiveDoc = (props) => {
  return <JTree />
}

export const DBViewer = (props) => {
  return props.activeDoc
    ? showActiveDoc(props)
    : !props.activeCollection 
      ? showRootCollections(props)
      : showCollectionDocs(props)
}

export const FireDb = withTheme(
  connect(({ firestore }) => ({
    roots: firestore.roots,
    activeCollection: firestore.activeCollection,
    docs: firestore.collections[ firestore.activeCollection && firestore.activeCollection.id ],
    activeDoc: firestore.activeDoc,
  }))(DBViewer)
)