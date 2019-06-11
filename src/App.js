import React, { Component } from "react";
import Router from "./Router";
import "./styles/global.css";
import { ReThemeProvider } from 're-theme'
import { Main } from './theme'
import { dbInit } from './actions'

class App extends Component { 
  
  state = { theme: Main }
  
  componentDidMount = () => {
    if(!this.state.theme)
      this.setState({ theme: Main })
    
    if(this.state.dbMounted) return
    
    dbInit()
    this.setState({ dbMounted: true })
  }
  
  render() {
    return (
      <ReThemeProvider value={ this.state.theme || Main } >
        <Router />
      </ReThemeProvider>
    )
  }
}

export default App;
