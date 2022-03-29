/**
 * It returns a function that fetches backend status data from the server.
 */
import { useAuth0 } from '@auth0/auth0-react'
import { useCallback, useState } from 'react'

import get from '../api/helpers/get'

export default function useGetServerStatus() {
  const { getAccessTokenSilently } = useAuth0()

  const path = '/v1/aca-py/status'
  const transformData = (retrievedData) => retrievedData

  const statusOptions = ['idle', 'error', 'fetching', 'fetched']
  const [status, setStatus] = useState(statusOptions[0])
  const [error, setError] = useState(null)

  const onStartFetch = useCallback(
    (fetchOrigin, setStoreData) => {
      const params = {}
      get(
        fetchOrigin,
        path,
        getAccessTokenSilently,
        params,
        setStatus,
        setError,
        setStoreData,
        transformData
      )
    },
    [getAccessTokenSilently]
  )

  return [status, error, onStartFetch]
}
