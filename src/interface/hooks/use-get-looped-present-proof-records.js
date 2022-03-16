/**
 * This function returns continuously the present proof records
 */
import { useCallback, useState } from 'react'
import getLooped from '../api/helpers/get-looped'
export default function useGetLoopedPresentProofRecords() {
  const path = '/present-proof-2.0/records'
  const transformData = (retData) => retData.results
  const statusOptions = ['started', 'error', 'stopped']
  const [status, setStatus] = useState(statusOptions[0])
  const [error, setError] = useState(null)
  const onStartFetch = useCallback((origin, setStoreData) => {
    const params = {}
    const intervalId = setInterval(() => {
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
