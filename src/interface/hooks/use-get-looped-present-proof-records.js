/**
 * This function returns continuously the present proof records
 */
import { useCallback, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import getLooped from '../api/helpers/get-looped'

export default function useGetLoopedPresentProofRecords() {
  const { getAccessTokenSilently } = useAuth0()
  const path = '/v1/aca-py/present-proof-2.0/records'
  const transformData = (retData) => retData.results
  const statusOptions = ['started', 'error', 'stopped']
  const [status, setStatus] = useState(statusOptions[0])
  const [error, setError] = useState(null)
  const onStartFetch = useCallback(
    (origin, setStoreData) => {
      const params = {}
      const intervalId = setInterval(() => {
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
