/**
 * It creates a function that will post a schema to the server.
 */
import { useCallback, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import post from '../api/helpers/post'

import { WALLET_TYPE } from '../../utils/env'
import WALLET_STATUS from '../../utils/wallet-status'

const mkWalletKey = () => {
  const chars = [
    ...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  ]
  const u8 = new Uint8Array(32)
  window.crypto.getRandomValues(u8)
  return [...u8].map((r) => chars[r % chars.length]).join('')
}

export default function usePostMultitenancyWallet() {
  const { getAccessTokenSilently } = useAuth0()

  const path = '/v1/aca-py/multitenancy/wallet'
  const statusOptions = ['idle', 'error', 'fetching', 'fetched']
  const [status, setStatus] = useState(statusOptions[0])
  const [error, setError] = useState(null)

  const onStartFetch = useCallback(
    (fetchOrigin, label, setStoreData) => {
      const params = {}
      const body = {
        label,
        key_management_mode: 'managed',
        wallet_key: mkWalletKey(),
        wallet_type: WALLET_TYPE,
      }

      post(
        fetchOrigin,
        path,
        getAccessTokenSilently,
        params,
        body,
        setStatus,
        setError,
        setStoreData,
        () => WALLET_STATUS.READY
      )
    },
    [getAccessTokenSilently]
  )
  return [status, error, onStartFetch]
}
