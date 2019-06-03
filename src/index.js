import './utils/log'
import './utils/styles/font_awesome.js'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { initializeStore } from './store'
import App from './App'

ReactDOM.render(
  (
    <Provider store={initializeStore()}>
      <App />
    </Provider>
  ),
  document.getElementById('app')
)
