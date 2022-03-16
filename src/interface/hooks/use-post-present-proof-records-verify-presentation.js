/**
 * This function is used to post a verify presentation record.
 */
import { useCallback, useState } from 'react'
import post from '../api/helpers/post'

export default function usePostPresentProofRecordsVerifyPresentation() {
  const path = '/present-proof-2.0/records/?/verify-presentation'
  const transformData = (retrievedData) => retrievedData
  const [error, setError] = useState(null)
  const onStartFetch = useCallback(
    (origin, presentationExchangeId, setStatus, setStoreData) => {
      const pathFinal = path.replace('?', presentationExchangeId)
      const params = {}
      const body = {}
      post(
        origin,
        pathFinal,
        params,
        body,
        setStatus,
        setError,
        setStoreData,
        transformData
      )
    },
    []
  )
  return [error, onStartFetch]
}
