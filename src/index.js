/**
 * This renders ReactDOM.render() which is a React method that takes two arguments:
 * 1. The first argument is the component you want to render, as in, the App component.
 * 2. The second argument is the DOM element you want to render the component to.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
