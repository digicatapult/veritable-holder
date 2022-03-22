/**
 * This is the main component of the app. It's the one that renders the Navbar and
 * the ContentSelector and all the rest
 * @returns The AppCore component is returning the NavbarWrap,
 * ConnectivityAndBreadcrumbWrap, and ContentSelectorWrap components.
 */
import { useState, useEffect } from 'react'

import useGetServerStatus from '../../../interface/hooks/use-get-server-status'

import NavbarWrap from './../../Common/Navigation/NavbarWrap'
import LogoWrap from '../../Common/Navigation/LogoWrap'
import ErrorModal from './../../Common/Misc/ErrorModal'
import NavbarNavigationMenu from '../../Common/Navigation/NavbarNavigationMenu'
import NavbarProfile from '../../Common/Navigation/NavbarProfile'
import NavbarDropdownWrap from '../../Common/Navigation/NavbarDropdown/NavbarDropdownWrap'
import ConnectivityAndBreadcrumbWrap from '../../Common/Navigation/ConnectivityAndBreadcrumbWrap'
import BreadcrumbWrap from '../../Common/Navigation/BreadcrumbWrap/BreadcrumbWrap'
import ConnectivityWrap from '../../Common/Navigation/Connectivity/ConnectivityWrap'
import ContentSelectorWrap from '../../Common/Misc/ContentSelectorWrap'
import ContentSelector from '../../Common/Misc/ContentSelector'

import AuthLoadingOverlay from '../../Common/Misc/AuthLoadingOverlay'
import AuthRedirectPopup from '../../Common/Misc/AuthRedirectPopup'
import AuthLoggedOutPopup from '../../Common/Misc/AuthLoggedOutPopup'
import { useAuth0 } from '@auth0/auth0-react'

export default function AppCore({ agent }) {
  const [configuredOrigin, setConfiguredOrigin] = useState('')
  const [data, setData] = useState({})
  const [userDetails, setUserDetails] = useState(null)
  const [userToken, setUserToken] = useState(null)
  const [status, error, startFetchHandler] = useGetServerStatus()

  const [showAuthRedirectPopup, setShowAuthRedirectPopup] = useState(false)
  const [showAuthLoggedOutPopup, setShowAuthLoggedOutPopup] = useState(false)

  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    logout,
    user,
    getAccessTokenSilently,
  } = useAuth0()

  /* Example of data obj: */
  /* {"version":"0.7.3","label":"foo.agent", "conductor":{"in_sessions":0,"out_encode":0,
	"out_deliver":0,"task_active":1,"task_done":816, "task_failed":97,"task_pending":0}} */

  const clickLogoutHandler = () => {
    const { protocol, hostname, port } = window.location
    const returnTo = `${protocol}//${hostname}:${port ? port : ''}`
    logout({ returnTo })
  }

  useEffect(() => {
    // On componentDidMount set the timed redirect popup
    // TODO: This part needs a bit of cleanup!
    if (!isLoading && !isAuthenticated && localStorage.getItem('wasAuthB4')) {
      setShowAuthLoggedOutPopup(true)
    }
    if (!isLoading && !isAuthenticated && !localStorage.getItem('wasAuthB4')) {
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
    if (isAuthenticated) {
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

  const saveOriginHandler = (insertedOrigin) => {
    const setStoreDataFn = (resData) => {
      setData(resData)
    }
    setConfiguredOrigin(insertedOrigin)
    if (insertedOrigin !== '') {
      startFetchHandler(insertedOrigin, setStoreDataFn)
    }
  }

  return (
    <>
      <>
        {isLoading && <AuthLoadingOverlay />}
        {showAuthRedirectPopup && <AuthRedirectPopup />}
        {showAuthLoggedOutPopup && <AuthLoggedOutPopup />}
      </>
      {isAuthenticated && (
        <NavbarWrap>
          <LogoWrap agent={agent} />
          {status === 'idle' && !error && (
            <>
              <NavbarDropdownWrap
                status={status}
                agent={agent}
                onSaveOrigin={saveOriginHandler}
              />
              <NavbarNavigationMenu status={status} />
              <NavbarProfile
                status={status}
                user={userDetails}
                token={userToken}
                onClickLogout={clickLogoutHandler}
              />
            </>
          )}
          {status === 'error' && (
            <>
              <NavbarDropdownWrap status={status} agent={agent} />
              <NavbarNavigationMenu status={status} />
              <NavbarProfile
                status={status}
                user={userDetails}
                token={userToken}
                onClickLogout={clickLogoutHandler}
              />
            </>
          )}
          {status === 'fetching' && !error && (
            <>
              <NavbarDropdownWrap status={status} agent={agent} />
              <NavbarNavigationMenu status={status} />
              <NavbarProfile
                status={status}
                user={userDetails}
                token={userToken}
                onClickLogout={clickLogoutHandler}
              />
            </>
          )}
          {status === 'fetched' && !error && (
            <>
              <NavbarDropdownWrap status={status} agent={agent} />
              <NavbarNavigationMenu status={status} />
              <NavbarProfile
                status={status}
                data={data}
                user={userDetails}
                token={userToken}
                onClickLogout={clickLogoutHandler}
              />
            </>
          )}
        </NavbarWrap>
      )}
      {isAuthenticated && (
        <ConnectivityAndBreadcrumbWrap>
          <BreadcrumbWrap status={status} persona={data.label} />
          {status === 'fetched' && (
            <ConnectivityWrap
              serverStatus={status}
              origin={configuredOrigin}
              persona={data.label}
            />
          )}
        </ConnectivityAndBreadcrumbWrap>
      )}
      {isAuthenticated && (
        <ContentSelectorWrap>
          <ContentSelector
            status={status}
            origin={configuredOrigin}
            persona={data.label}
          />
        </ContentSelectorWrap>
      )}
      {status === 'error' && <ErrorModal visibility content={error} />}
    </>
  )
}
