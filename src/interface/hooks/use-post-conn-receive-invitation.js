/**
 * This function is used to POST send send the conn receive invitation
 */
import { useCallback, useState } from 'react'
import { Buffer } from 'buffer'
import post from '../api/helpers/post'

export default function usePostConnReceiveInvitation() {
  const path = '/connections/receive-invitation'
  const transformData = (retrievedData) => {
    return retrievedData.connection_id
  }

  const [error, setError] = useState(null)

  const onStartReceiveInv = useCallback(
    (origin, body, persona, setStatusVal, setStoreData) => {
      const bodyB64 = body
      const bodyBuffer = Buffer.from(bodyB64, 'base64')
      body = bodyBuffer.toString()
      const label = JSON.parse(body).label.toLowerCase()
      const params = { alias: `${persona}2${label}` }
      post(
        origin,
        path,
        params,
        body,
        setStatusVal,
        setError,
        setStoreData,
        transformData
      )
    },
    []
  )

  return [error, onStartReceiveInv]
}
