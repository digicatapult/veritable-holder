/**
 * This function is used to send with POST a credential offer to the server
 */
import { useCallback, useState } from 'react'
import post from '../api/helpers/post'

export default function usePostIssueCredentialSendOffer() {
  const path = '/issue-credential-2.0/send-offer'
  const transformData = (retrievedData) => retrievedData.cred_ex_id
  const [error, setError] = useState(null)
  const onStartFetch = useCallback(
    (
      origin,
      connectionId,
      credDefId,
      id,
      name,
      surname,
      type,
      title,
      subtitle,
      expiration,
      setStoreStatus,
      setStoreData
    ) => {
      const createBody = (
        connectionId,
        credDefId,
        id,
        name,
        surname,
        type,
        title,
        subtitle,
        expiration
      ) => {
        const CRED_PREVIEW_TYPE =
          'https://didcomm.org/issue-credential/2.0/credential-preview'
        const exchangeTracing = false
        const autoRemove = false
        const getTimestamp = () => {
          const timestamp = new Date() / 1000
          return timestamp.toFixed()
        }
        const getDateString = (d) => {
          if (!d) {
            let now = new Date()
            now = +now.setHours(0, 0, 0, 0) + 86400000
            now = new Date(now).toISOString()
            now = now.slice(0, 10)
            d = now
          }
          d = d.split('-').join('')
          return d
        }
        const credAttrs = {
          id: id,
          name: name,
          surname: surname,
          type: type,
          title: title,
          subtitle: subtitle,
          expiration_dateint: getDateString(expiration),
          timestamp: getTimestamp(),
        }
        const convertToNameValueArr = (obj) => {
          const nameValueArr = []
          for (const [name, value] of Object.entries(obj)) {
            nameValueArr.push({ name, value })
          }
          return nameValueArr
        }
        const credAttrsArr = convertToNameValueArr(credAttrs)
        const credPreview = {
          '@type': CRED_PREVIEW_TYPE,
          attributes: credAttrsArr,
        }
        const offerRequest = {
          connection_id: connectionId,
          comment: `Offer on cred def id ${credDefId}`,
          auto_remove: autoRemove,
          credential_preview: credPreview,
          filter: { indy: { cred_def_id: credDefId } },
          trace: exchangeTracing,
        }
        return offerRequest
      }
      const params = {}
      const body = createBody(
        connectionId,
        credDefId,
        id,
        name,
        surname,
        type,
        title,
        subtitle,
        expiration
      )
      post(
        origin,
        path,
        params,
        body,
        setStoreStatus,
        setError,
        setStoreData,
        transformData
      )
    },
    []
  )
  return [error, onStartFetch]
}
