import React from "react"
import { View } from "react-native"
import { PageHeader, FireDb, Container } from '../components'

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
  
  onNavigatePress = (path) => {
    console.log(`---------- path ----------`)
    console.log(path)
  } 

  
  render() {
    const nav = {
      toggle: this.toggleNav,
      open: this.state.navOpen,
      onNavigate: this.onNavigatePress
    }

    return (
      <View style={ styles.container } >
        <PageHeader
          nav={nav}
        />
        <Container>
          <FireDb/>
        </Container>
      </View>
    )
  }
}
