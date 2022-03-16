/**
 * It returns a function that will fetch continuously the credentials from the server.
 */
import { useCallback, useState } from 'react'
import getLooped from '../api/helpers/get-looped'

export default function useLoopedGetCredentials() {
  const path = '/credentials'
  const transformData = (retrievedData) => retrievedData.results.reverse()
  const statusOptions = ['started', 'error', 'stopped']
  const [status, setStatus] = useState(statusOptions[0])
  const [error, setError] = useState(null)
  const onStartFetch = useCallback((origin, setStoreData) => {
    const params = {}
    const intervalId = setInterval(() => {
      /* From: https://codesandbox.io/s/useinterval-nylhv */
      getLooped(
        origin,
        path,
        params,
        setStatus,
        setError,
        setStoreData,
        transformData
      )
    }, 1000)
    return intervalId
  }, [])
  return [status, error, onStartFetch]
}
