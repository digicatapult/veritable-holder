/**
 * This function is used to fetch the credential sets from the wallet
 * @returns A set of credential sets.
 */
import { useEffect, useState } from 'react'
import CredentialSetItem from '../CredentialSetItem'
import useLoopedGetCredentials from '../../../interface/hooks/use-get-looped-credentials'

export default function ColumnLeftWrap({ origin, records }) {
  const [dataCredentialSets, setDataCredentialSets] = useState([])
  const [status, error, startGetCredentialSetsHandler] =
    useLoopedGetCredentials()
  useEffect(() => {
    const setStoreDataFn = (resData) => setDataCredentialSets(resData)
    const intervalIdFetch = startGetCredentialSetsHandler(
      origin,
      setStoreDataFn
    )
    if (status !== 'started') clearInterval(intervalIdFetch)
    return function clear() {
      return clearInterval(intervalIdFetch)
    }
  }, [origin, status, startGetCredentialSetsHandler])
  return (
    <>
      <div className="col-md-6">
        <div className="container py-1">
          <div className="row">
            <div className="col-md-12">
              <h5>My Credentials</h5>
              <p className="small">
                View all sets of credentials from my wallet:
              </p>

              {dataCredentialSets.length === 0 && <p className="small">N/A</p>}

              {dataCredentialSets.length > 0 &&
                dataCredentialSets.map((i, k) => (
                  <div key={k} className="card mb-3">
                    <CredentialSetItem
                      origin={origin}
                      item={i}
                      index={k}
                      records={records}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={error ? 'd-block' : 'd-none'}
        style={{
          position: 'fixed',
          width: '10%',
          height: '10%',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 100,
        }}
      >
        <div className="text-light m-2 p-2">
          {' '}
          <small>{error}</small>{' '}
        </div>
      </div>
    </>
  )
}
