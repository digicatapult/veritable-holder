/**
 * This function returns a function that, will fetch the credential
 * definitions created by the user
 */
import { useCallback, useState } from 'react'
import get from '../api/helpers/get'

export default function useGetCredDefinitionsCreated() {
  const path = '/credential-definitions/created'
  const transformData = (retrievedData) =>
    retrievedData.credential_definition_ids

  const statusOptions = ['idle', 'error', 'fetching', 'fetched']
  const [status, setStatus] = useState(statusOptions[0])
  const [error, setError] = useState(null)

  const onStartFetch = useCallback((fetchOrigin, schema, setStoreData) => {
    const params = { schema_id: schema }
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
