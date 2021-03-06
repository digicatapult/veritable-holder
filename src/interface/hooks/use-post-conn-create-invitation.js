/**
 * This function creates a connection invitation.
 */
import { useCallback, useState } from 'react'
import { Buffer } from 'buffer'
import { useAuth0 } from '@auth0/auth0-react'

import post from '../api/helpers/post'

export default function usePostConnCreateInvitation() {
  const { getAccessTokenSilently } = useAuth0()

  const path = '/connections/create-invitation'
  const transformData = (retrievedData) => {
    const inputStr = retrievedData.invitation
    const inputJson = JSON.stringify(inputStr)
    const b64Buffer = Buffer.from(inputJson)
    const b64 = b64Buffer.toString('base64')
    return b64
  }

  const statusOptions = ['idle', 'error', 'fetching', 'fetched']
  const [status, setStatus] = useState(statusOptions[0])
  const [error, setError] = useState(null)

  const onStartCreateInv = useCallback(
    (origin, persona, setStoreData) => {
      const params = { alias: `${persona.toLowerCase()}` }
      const body = {}
      post(
        origin,
        path,
        getAccessTokenSilently,
        params,
        body,
        setStatus,
        setError,
        setStoreData,
        transformData
      )
    },
    [getAccessTokenSilently]
  )

  return [status, error, onStartCreateInv]
}
