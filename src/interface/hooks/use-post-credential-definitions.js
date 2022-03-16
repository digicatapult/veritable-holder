/**
 * This function is used to create a credential definition
 */
import { useCallback, useState } from 'react'
import post from '../api/helpers/post'

export default function usePostCredentialDefinitions() {
  const path = '/credential-definitions'
  const transformData = (retrievedData) =>
    retrievedData.credential_definition_id
  const statusOptions = ['idle', 'error', 'fetching', 'fetched']
  const [status, setStatus] = useState(statusOptions[0])
  const [error, setError] = useState(null)
  const onStartFetch = useCallback(
    (fetchOrigin, selectedSchemaId, persona, setStoreData) => {
      const params = {}
      const createBody = (selectedSchemaId, persona) => {
        const supportRevocation = false
        const sanitizeTitleWUnderscore = (str) => {
          const space = new RegExp(' ', 'g')
          str = str.replace(space, '_')
          return str
        }
        const schemaId = selectedSchemaId
        const schemaDefName = schemaId.split(':')[2]
        const schemaDefTagName = sanitizeTitleWUnderscore(schemaDefName)
        const schemaDefTagPrefix = `${persona}.agent`
        const credDefTag = `${schemaDefTagPrefix}.${schemaDefTagName}`
        const did = schemaId.split(':')[0]
        const definitionBody = {
          schema_id: schemaId,
          support_revocation: supportRevocation,
          tag: credDefTag,
          did: did,
        }
        return definitionBody
      }
      const body = createBody(selectedSchemaId, persona)
      post(
        fetchOrigin,
        path,
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
  return [status, error, onStartFetch]
}
