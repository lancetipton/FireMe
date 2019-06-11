import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { withTheme } from 're-theme'
import { selectCollection } from '../../../actions'
import { checkCall } from 'jsutils'


class JTreeComp extends Component {

  componentDidMount(){

  }
  
  shouldComponentUpdate = nextProps => {
    return !!nextProps.shouldUpdate;
  }

  render(){

    return null
  }
  
}

const JTree = withTheme(JTreeComp)

export {
  JTree
}
