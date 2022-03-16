/**
 * This function is used to send with POST a request for a present proof
 */
import { useCallback, useState } from 'react'
import post from '../api/helpers/post'

export default function usePostPresentProofSendRequest() {
  const path = '/present-proof-2.0/send-request'
  const transformData = (retrievedData) => {
    return retrievedData.pres_ex_id
  }
  const [error, setError] = useState(null)

  const onStartFetch = useCallback(
    (
      origin,
      connectionId,
      id,
      name,
      surname,
      type,
      validity,
      setStatus,
      setStoreData
    ) => {
      const createBody = (connectionId, id, name, surname, type, validity) => {
        const exchangeTracing = false
        const resId = { schema_name: 'drone schema', 'attr::id::value': id }
        const resName = {
          schema_name: 'drone schema',
          'attr::name::value': name,
        }
        const resSurname = {
          schema_name: 'drone schema',
          'attr::surname::value': surname,
        }
        const resType = {
          schema_name: 'drone schema',
          'attr::type::value': type,
        }
        const reqAttrs = [
          { name: 'id', restrictions: [resId] },
          { name: 'name', restrictions: [resName] },
          { name: 'surname', restrictions: [resSurname] },
          { name: 'type', restrictions: [resType] },
        ]
        const reqPrs4zkProofs = [
          {
            name: 'expiration_dateint',
            p_type: '>=',
            p_value: validity.split('-').join('') * 1,
            restrictions: [{ schema_name: 'drone schema' }],
          },
        ]
        const indyProofRequest = {
          name: 'Proof of Expiration',
          version: '1.0',
          requested_attributes: Object.fromEntries(
            reqAttrs.map((e) => [`0_${e.name}_uuid`, e])
          ),
          requested_predicates: Object.fromEntries(
            reqPrs4zkProofs.map((e) => [`0_${e.name}_GE_uuid`, e])
          ),
        }
        const proofRequestWebRequest = {
          comment: 'string',
          connection_id: connectionId,
          presentation_request: { indy: indyProofRequest },
          trace: exchangeTracing,
        }
        return proofRequestWebRequest
      }
      const params = {}
      const body = createBody(connectionId, id, name, surname, type, validity)
      post(
        origin,
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
  return [error, onStartFetch]
}
