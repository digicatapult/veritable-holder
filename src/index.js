/* This is the code that renders the app. */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH_AUDIENCE } from './utils/env'

ReactDOM.render(
  <Auth0Provider
    domain={AUTH0_DOMAIN}
    clientId={AUTH0_CLIENT_ID}
    audience={AUTH_AUDIENCE}
    scope=""
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
)
