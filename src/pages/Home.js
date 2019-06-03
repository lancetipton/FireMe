import React from "react"
import { View } from "react-native"
import { PageHeader } from '../components'

const styles = {
  container: {
    flex: 1,
  }
}


export default class Page extends React.Component {

  state = { navOpen: false }
  
  toggleNav = () => {
    this.setState({ navOpen: !this.state.navOpen })
  }
  
  render() {
    const nav = {
      toggle: this.toggleNav,
      open: this.state.navOpen,
    }
    
    return (
      <View style={ styles.container } >
        <PageHeader
          nav={nav}
          
        />
      </View>
    )
  }
}
