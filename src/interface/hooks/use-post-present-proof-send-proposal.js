/**
 * This function is used to send with POST a proposal for a present proof
 */
import { useCallback, useState } from 'react'
import post from '../api/helpers/post'

export default function usePostPresentProofSendProposal() {
  const path = '/present-proof-2.0/send-proposal'
  const transformData = (retrievedData) => {
    return retrievedData.pres_ex_id
  }
  const [error, setError] = useState(null)

  const onStartFetch = useCallback(
    (origin, connectionId, id, type, referent, setStatus, setStoreData) => {
      const createBody = (connectionId, id, type, referent) => {
        const reqAttrs = [
          {
            name: 'id',
            restrictions: [
              { schema_name: 'drone schema', 'attr::id::value': id },
            ],
          },
          {
            name: 'type',
            restrictions: [
              {
                schema_name: 'drone schema',
                'attr::type::value': type,
              },
            ],
          },
        ]

        return {
          comment: referent,
          connection_id: connectionId,
          presentation_proposal: {
            indy: {
              name: 'Proof of Test Certificate',
              version: '1.0',
              requested_attributes: Object.fromEntries(
                reqAttrs.map((e) => [`0_${e.name}_uuid`, e])
              ),
              requested_predicates: {},
            },
          },

          trace: false,
        }
      }
      const params = {}
      const body = createBody(connectionId, id, type, referent)

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
