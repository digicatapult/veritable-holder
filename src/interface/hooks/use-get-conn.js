/**
 * It returns a function that will fetch the connection ID from the server.
 */
import { useCallback, useState } from 'react'
import get from '../api/helpers/get'

export default function useGetConn() {
  const path = '/connections'
  const statusOptions = ['idle', 'error', 'fetching', 'fetched']
  const [status, setStatus] = useState(statusOptions[0])
  const [error, setError] = useState(null)

  const onStartFetch = useCallback(
    (fetchOrigin, setStoreData, label = null) => {
      const getConnectionByLabel = (retrievedData) => {
        const res = retrievedData.results
        const connections = res.filter(
          (c) =>
            c.state === 'active' &&
            (label === null || c.their_label.includes(label))
        )
        return connections[0]?.connection_id
      }

      const params = {}
      get(
        fetchOrigin,
        path,
        params,
        setStatus,
        setError,
        setStoreData,
        getConnectionByLabel
      )
    },
    []
  )

  return [status, error, onStartFetch]
}
