/**
 * This is the main component of the app. It's the one that renders the Navbar and
 * the ContentSelector and all the rest
 * @returns The AppCore component is returning the NavbarWrap,
 * ConnectivityAndBreadcrumbWrap, and ContentSelectorWrap components.
 */
import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import useGetServerStatus from '../../../interface/hooks/use-get-server-status'
import usePostMultitenancyWallet from '../../../interface/hooks/use-post-multitenancy-wallet'

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

import WALLET_STATUS from '../../../utils/wallet-status'

export default function AppCore({ agent }) {
  const [configuredOrigin, setConfiguredOrigin] = useState('')
  const [serverStatus, setServerStatus] = useState({})
  const [userDetails, setUserDetails] = useState(null)
  const [walletStatus, setWalletStatus] = useState(WALLET_STATUS.NOT_READY)

  const [statusGetStatus, statusGetError, startGetStatusHandler] =
    useGetServerStatus()
  const [walletPostStatus, walletPostError, startWalletPostHandler] =
    usePostMultitenancyWallet()

  const [showAuthRedirectPopup, setShowAuthRedirectPopup] = useState(false)
  const [showAuthLoggedOutPopup, setShowAuthLoggedOutPopup] = useState(false)

  const { loginWithRedirect, isAuthenticated, isLoading, logout, user } =
    useAuth0()

  const clickLogoutHandler = () => {
    const { protocol, hostname, port } = window.location
    const returnTo = `${protocol}//${hostname}:${port ? port : ''}`
    logout({ returnTo })
  }

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
    // Finally authenticated, meaning the info about the user and token can be pulled now
    if (isAuthenticated && !isLoading) {
      setUserDetails(user)
    }
  }, [
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    user,
    startWalletPostHandler,
  ])

  useEffect(() => {
    if (walletPostStatus === 'error' && walletPostError === '409:Conflict') {
      setWalletStatus(WALLET_STATUS.READY)
    }
  }, [walletPostStatus, walletPostError])

  const saveOriginHandler = (insertedOrigin) => {
    setConfiguredOrigin(insertedOrigin)
    if (insertedOrigin !== '') {
      startGetStatusHandler(insertedOrigin, setServerStatus)
      startWalletPostHandler(insertedOrigin, user.name, setWalletStatus)
    }
  }

  const applicationReady =
    isAuthenticated && walletStatus === WALLET_STATUS.READY
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
          {statusGetStatus === 'idle' && !statusGetError && (
            <>
              <NavbarDropdownWrap
                status={statusGetStatus}
                agent={agent}
                onSaveOrigin={saveOriginHandler}
              />
              <NavbarNavigationMenu status={statusGetStatus} />
              <NavbarProfile
                status={statusGetStatus}
                user={userDetails}
                onClickLogout={clickLogoutHandler}
              />
            </>
          )}
          {statusGetStatus === 'error' && (
            <>
              <NavbarDropdownWrap status={statusGetStatus} agent={agent} />
              <NavbarNavigationMenu status={statusGetStatus} />
              <NavbarProfile
                status={statusGetStatus}
                user={userDetails}
                onClickLogout={clickLogoutHandler}
              />
            </>
          )}
          {statusGetStatus === 'fetching' && !statusGetError && (
            <>
              <NavbarDropdownWrap status={statusGetStatus} agent={agent} />
              <NavbarNavigationMenu status={statusGetStatus} />
              <NavbarProfile
                status={statusGetStatus}
                user={userDetails}
                onClickLogout={clickLogoutHandler}
              />
            </>
          )}
          {statusGetStatus === 'fetched' && !statusGetError && (
            <>
              <NavbarDropdownWrap status={statusGetStatus} agent={agent} />
              <NavbarNavigationMenu status={statusGetStatus} />
              <NavbarProfile
                status={statusGetStatus}
                data={serverStatus}
                user={userDetails}
                onClickLogout={clickLogoutHandler}
              />
            </>
          )}
        </NavbarWrap>
      )}
      {applicationReady && (
        <ConnectivityAndBreadcrumbWrap>
          <BreadcrumbWrap
            status={statusGetStatus}
            persona={serverStatus.label}
          />
          {statusGetStatus === 'fetched' && (
            <ConnectivityWrap
              serverStatus={statusGetStatus}
              origin={configuredOrigin}
              persona={serverStatus.label}
            />
          )}
        </ConnectivityAndBreadcrumbWrap>
      )}
      {applicationReady && (
        <ContentSelectorWrap>
          <ContentSelector
            status={statusGetStatus}
            origin={configuredOrigin}
            persona={serverStatus.label}
          />
        </ContentSelectorWrap>
      )}
      {statusGetStatus === 'error' ||
        (walletStatus === WALLET_STATUS.ERROR && (
          <ErrorModal visibility content={statusGetError || walletPostError} />
        ))}
    </>
  )
}
