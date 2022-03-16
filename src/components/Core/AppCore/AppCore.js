/**
 * This function is the main component of the app. It renders the NavbarWrap,
 * ConnectivityAndBreadcrumbWrap, ContentSelectorWrap
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

export default function AppCore({ agent }) {
  const [configuredOrigin, setConfiguredOrigin] = useState('')
  const [data, setData] = useState({})
  const [status, error, startFetchHandler] = useGetServerStatus()

  /* Example of data obj: */
  /* {"version":"0.7.1","label":"faber.agent", "conductor":{"in_sessions":0,"out_encode":0,
	"out_deliver":0,"task_active":1,"task_done":816, "task_failed":97,"task_pending":0}} */

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
            <NavbarProfile status={status} />
          </>
        )}
        {status === 'error' && (
          <>
            <NavbarDropdownWrap status={status} agent={agent} />
            <NavbarNavigationMenu status={status} />
            <NavbarProfile status={status} />
          </>
        )}
        {status === 'fetching' && !error && (
          <>
            <NavbarDropdownWrap status={status} agent={agent} />
            <NavbarNavigationMenu status={status} />
            <NavbarProfile status={status} />
          </>
        )}
        {status === 'fetched' && !error && (
          <>
            <NavbarDropdownWrap status={status} agent={agent} />
            <NavbarNavigationMenu status={status} />
            <NavbarProfile status={status} data={data} />
          </>
        )}
      </NavbarWrap>
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
      <ContentSelectorWrap>
        <ContentSelector
          status={status}
          origin={configuredOrigin}
          persona={data.label}
        />
      </ContentSelectorWrap>
      {status === 'error' && <ErrorModal visibility content={error} />}
    </>
  )
}
