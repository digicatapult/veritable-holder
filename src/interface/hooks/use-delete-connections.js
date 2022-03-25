/**
 * It returns a function that can be used to delete a connection.
 */
import { useCallback, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import del from '../api/helpers/del'

export default function useDeleteConnections() {
  const { getAccessTokenSilently } = useAuth0()

  const path = '/v1/aca-py/connections/'
  const transformData = (retrievedData) => retrievedData
  const statusOptions = ['idle', 'error', 'fetching', 'fetched']
  const [status, setStatus] = useState(statusOptions[0])
  const [error, setError] = useState(null)
  const onStartFetch = useCallback(
    (origin, connId, setStoreData) => {
      const params = {}
      del(
        origin,
        path + connId,
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
