/**
 * This function returns continuously the issue credentials records
 */
import { useCallback, useState } from 'react'
import getLooped from '../api/helpers/get-looped'

export default function useGetIssueCredentialRecords() {
  const path = '/issue-credential-2.0/records'
  const transformData = (retrievedData) => retrievedData.results
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
