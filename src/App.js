import React, { Component } from "react";
import Router from "./Router";
import "./styles/global.css";
import { BreadProvider } from 'material-bread';
import { Main } from './theme'
class App extends Component { 
  
  state = {}
  
  componentDidMount = () => {
    if(!this.state.theme)
      this.setState({ theme: Main })
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
