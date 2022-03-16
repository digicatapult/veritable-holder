/**
 * It returns a function that will fetch the connection ID from the server.
 */
import { useCallback, useState } from 'react'
import get from '../api/helpers/get'

export default function useGetConn() {
  const path = '/connections'
  const transformData = (retrievedData) => {
    const res = retrievedData.results
    const act = res.filter((c) => c.state === 'active')
    return act[0]?.connection_id
  }
  const statusOptions = ['idle', 'error', 'fetching', 'fetched']
  const [status, setStatus] = useState(statusOptions[0])
  const [error, setError] = useState(null)
  const onStartFetch = useCallback((fetchOrigin, setStoreData) => {
    const params = {}
    get(
      fetchOrigin,
      path,
      params,
      setStatus,
      setError,
      setStoreData,
      transformData
    )
  }, [])

  return [status, error, onStartFetch]
}
