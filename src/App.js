import './stylesheets/font-awesome.min.css'
import './stylesheets/AppTheme.css'

import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import AppCore from './components/Core/AppCore'
import AuthLoadingOverlay from './components/Common/Misc/AuthLoadingOverlay'
import AuthRedirectPopup from './components/Common/Misc/AuthRedirectPopup'
import AuthLoggedOutPopup from './components/Common/Misc/AuthLoggedOutPopup'

function App() {
  const [showAuthRedirectPopup, setShowAuthRedirectPopup] = useState(false)
  const [showAuthLoggedOutPopup, setShowAuthLoggedOutPopup] = useState(false)
  const [userDetails, setUserDetails] = useState(null)
  const [userToken, setUserToken] = useState(null)

  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    user,
    getAccessTokenSilently,
  } = useAuth0()

  useEffect(() => {
    // On componentDidMount set the timed redirect popup
    if (!isAuthenticated && !isLoading) {
      if (localStorage.getItem('wasAuthB4')) {
        setShowAuthLoggedOutPopup(true)
      } else if (!localStorage.getItem('wasAuthB4')) {
        setShowAuthRedirectPopup(true)
        const timeId = setTimeout(() => {
          // After 3 seconds set the show value to false to remove popup
          setShowAuthRedirectPopup(false)
          loginWithRedirect().then(() => {
            localStorage.setItem('wasAuthB4', 'true')
          })
        }, 3 * 1000)
        return () => {
          // Clear the interval just to keep things simple
          clearInterval(timeId)
        }
      }
    }
    // Finally authenticated, meaning the info about the user and token can be pulled no
    if (isAuthenticated && !isLoading) {
      setUserDetails(user)
      getAccessTokenSilently().then((t) => setUserToken(t))
    }
  }, [
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    user,
    getAccessTokenSilently,
  ])

  return (
    <>
      {isLoading && <AuthLoadingOverlay />}
      {showAuthRedirectPopup && <AuthRedirectPopup />}
      {showAuthLoggedOutPopup && <AuthLoggedOutPopup />}
      {isAuthenticated && (
        <AppCore
          agent="holder"
          userDetails={userDetails}
          userToken={userToken}
        />
      )}
    </>
  )
}

export default App
