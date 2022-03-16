/**
 * It returns a function that fetches schemas created data from the server.
 */
import { useCallback, useState } from 'react'
import get from '../api/helpers/get'
/* {"schema_ids":["7JMrQkEyyqiWJBKsfp7RdY:2:degree schema:14.66.37"]} */
export default function useGetSchemasCreated() {
  const path = '/schemas/created'
  const transformData = (retrievedData) => retrievedData.schema_ids
  const statusOptions = ['idle', 'error', 'fetching', 'fetched']
  const [status, setStatus] = useState(statusOptions[0])
  const [error, setError] = useState(null)
  const onStartFetch = useCallback((fetchOrigin, setStoreData) => {
    const schemaName = ['drone', 'schema'].join(' ')
    const params = { schema_name: schemaName }
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
