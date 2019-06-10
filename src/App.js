import React, { Component } from "react";
import Router from "./Router";
import "./styles/global.css";
import { BreadProvider } from 'material-bread';
import { Main } from './theme'
import { dbInit } from './actions'
class App extends Component { 
  
  state = {}
  
  componentDidMount = () => {
    if(!this.state.theme)
      this.setState({ theme: Main })
    
    if(this.state.dbMounted) return
    
    dbInit()
    this.setState({ dbMounted: true })
  }
  
  render() {
    return (
      <BreadProvider value={ this.state.theme || Main } >
        <Router />
      </BreadProvider>
    )
  }
}

export default App;
