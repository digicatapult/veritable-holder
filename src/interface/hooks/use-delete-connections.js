/**
 * It returns a function that can be used to delete a connection.
 */
import { useCallback, useState } from 'react'
import del from '../api/helpers/del'

export default function useDeleteConnections() {
  const path = '/connections/'
  const transformData = (retrievedData) => retrievedData
  const statusOptions = ['idle', 'error', 'fetching', 'fetched']
  const [status, setStatus] = useState(statusOptions[0])
  const [error, setError] = useState(null)
  const onStartFetch = useCallback((origin, connId, setStoreData) => {
    const params = {}
    del(
      origin,
      path + connId,
      params,
      setStatus,
      setError,
      setStoreData,
      transformData
    )
  }, [])
  return [status, error, onStartFetch]
}
