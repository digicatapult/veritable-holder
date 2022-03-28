/**
 * This is the main component of the app. It's the one that renders the Navbar and
 * the ContentSelector and all the rest
 * @returns The AppCore component is returning the NavbarWrap,
 * ConnectivityAndBreadcrumbWrap, and ContentSelectorWrap components.
 */
import { useState } from 'react'

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

import { useAuth0 } from '@auth0/auth0-react'

export default function AppCore({ agent, userDetails, userToken }) {
  const [configuredOrigin, setConfiguredOrigin] = useState('')
  const [data, setData] = useState({})
  const [status, error, startFetchHandler] = useGetServerStatus()
  const { logout } = useAuth0()

  const clickLogoutHandler = () => {
    const { protocol, hostname, port } = window.location
    const returnTo = `${protocol}//${hostname}:${port ? port : ''}`
    logout({ returnTo })
  }

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
    <div data-cy="app-core">
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
      {
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
      }
      {
        <ContentSelectorWrap>
          <ContentSelector
            status={status}
            origin={configuredOrigin}
            persona={data.label}
          />
        </ContentSelectorWrap>
      }
      {status === 'error' && <ErrorModal visibility content={error} />}
    </div>
  )
}
