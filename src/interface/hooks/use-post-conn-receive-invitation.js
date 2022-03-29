/**
 * This function is used to POST send send the conn receive invitation
 */
import { useCallback, useState } from 'react'
import { Buffer } from 'buffer'
import { useAuth0 } from '@auth0/auth0-react'

import post from '../api/helpers/post'

export default function usePostConnReceiveInvitation() {
  const { getAccessTokenSilently } = useAuth0()

  const path = '/v1/aca-py/connections/receive-invitation'
  const transformData = (retrievedData) => {
    return retrievedData.connection_id
  }

  const [error, setError] = useState(null)

  const onStartReceiveInv = useCallback(
    (origin, body, persona, setStatusVal, setStoreData) => {
      const bodyB64 = body
      const bodyBuffer = Buffer.from(bodyB64, 'base64')
      const bodyObj = JSON.parse(bodyBuffer.toString())
      const label = bodyObj.label.toLowerCase()
      const params = { alias: `${persona}2${label}` }
      post(
        origin,
        path,
        getAccessTokenSilently,
        params,
        bodyObj,
        setStatusVal,
        setError,
        setStoreData,
        transformData
      )
    },
    [getAccessTokenSilently]
  )

  return [error, onStartReceiveInv]
}
