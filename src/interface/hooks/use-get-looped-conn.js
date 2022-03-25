/**
 * This function returns a function that will fetch continuously data
 * from the server, data about existing established or drafted connections
 */
import { useCallback, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import getLooped from '../api/helpers/get-looped'

export default function useGetLoopedConn() {
  const { getAccessTokenSilently } = useAuth0()

  const path = '/v1/aca-py/connections'
  const transformData = (retrievedData) => retrievedData

  const statusOptions = ['started', 'error', 'stopped']
  const [status, setStatus] = useState(statusOptions[0])
  const [error, setError] = useState(null)

  const onStartFetch = useCallback(
    (origin, setStoreData) => {
      const params = {}

      const intervalId = setInterval(() => {
        /* From: https://codesandbox.io/s/useinterval-nylhv */
        getLooped(
          origin,
          path,
          getAccessTokenSilently,
          params,
          setStatus,
          setError,
          setStoreData,
          transformData
        )
      }, 1000)
      return intervalId
    },
    [getAccessTokenSilently]
  )

  return [status, error, onStartFetch]
}
