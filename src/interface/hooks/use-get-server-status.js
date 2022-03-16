/**
 * It returns a function that fetches backend status data from the server.
 */
import { useCallback, useState } from 'react'
import get from '../api/helpers/get'

export default function useGetServerStatus() {
  const path = '/status'
  const transformData = (retrievedData) => retrievedData

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
