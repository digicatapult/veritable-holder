/**
 * It returns present the proof records from the API.
 */
import { useCallback, useState } from 'react'
import get from '../api/helpers/get'

export default function useGetPresentProofRecords() {
  const path = '/present-proof-2.0/records'
  const transformData = (retData) => {
    const results = retData.results
    return results.filter(
      (r) => r.state === 'presentation-received' || r.state === 'request-sent'
    )
  }
  const statusOptions = ['idle', 'error', 'fetching', 'fetched']
  const [status, setStatus] = useState(statusOptions[0])
  const [error, setError] = useState(null)
  const onStartFetch = useCallback((origin, setStoreData) => {
    const params = {}
    get(origin, path, params, setStatus, setError, setStoreData, transformData)
  }, [])
  return [status, error, onStartFetch]
}
