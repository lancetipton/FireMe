import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withTheme } from 're-theme'
import * as jTreeLib from 'jTree'
import * as jtDefs from 'jtree-definitions'
import Constants from 'jtree-definitions/esm/constants'

class JTreeComp extends Component {

  constructor(props){
    super(props)

    Constants.updateDefSchema(jTreeLib.Constants.Schema)
    Constants.updateDefValues(jTreeLib.Constants.Values)
    this.jtRef = React.createRef()
  }
  
  matchHelper = ({ value, key, matchTypes, tree, parent, Editor }) => {
    // Only here as a test for now.... remove later
    const AllTypes = Editor.Types.get()
    return typeof value === 'object'
      ? AllTypes.map
      : AllTypes.string
  }
  
  componentDidMount(){

    console.log(this.props)

    this.props.source && this.jtRef.current &&
    jTreeLib.init({
      element: this.jtRef.current,
      showLogs: true,
      editor: {
        confirmActions: false,
        eventOverride: 'instance',
        source: this.props.source && Object.keys(this.props.source).reduce((use, key) => {
          if(this.props.source[key] !== null && this.props.source[key] !== undefined)
            use[key] = this.props.source[key]
          
          return use
        }, {}),
        root: {
          start: 'open',
          title: 'My Object',
        },
        iconType: 'far',
        styles: {},
        appendTree: () => {}
      },
      types: {
        definitions: jtDefs,
        config: {
          base: {
            priority: 0,
            matchHelper: this.matchHelper,
          },
          boolean: {},
          map: {},
          collection: {},
          string: {},
          card: {},
          color: {},
          date: {},
          email: {},
          phone: {},
          url: {},
          uuid: {},
          number: {},
          float: {},
          money: {},
          percent: {},
        }
      }
    })
  }
  
  shouldComponentUpdate = nextProps => {
    return !!nextProps.shouldUpdate;
  }

  render(){
    return (<div ref={this.jtRef} />)
  }
  
}

export const JTree = withTheme(
  connect(({ firestore }) => ({
    source: firestore.activeDoc,
  }))(JTreeComp)
)
