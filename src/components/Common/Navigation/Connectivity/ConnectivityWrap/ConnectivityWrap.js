/**
 * This function is a wrapper for the Connections component. It's purpose is to
 * provide the connect form which allows the creation of connections with other
 * agents.
 */
import { useEffect, useState } from 'react'
import Connections from '../Connections'
import ConnectionsActiveCount from '../ConnectionsActiveCount'
import ConnectionAvatar from '../ConnectionAvatar'
import useGetLoopedConn from '../../../../../interface/hooks/use-get-looped-conn'
import usePostConnCreateInvitation from '../../../../../interface/hooks/use-post-conn-create-invitation'
import usePostConnReceiveInvitation from '../../../../../interface/hooks/use-post-conn-receive-invitation'
import useDeleteConnections from '../../../../../interface/hooks/use-delete-connections'
import { CAA_ENDPOINT, AGENT_LABEL } from '../../../../../utils/env'

export default function ConnectivityWrap({ children, serverStatus, origin }) {
  const [dataConnections, setDataConnections] = useState(null)
  const [caaConnected, setCAAConnected] = useState(false)
  const [statusConnections, errorConnections, startGetConnectionsHandler] =
    useGetLoopedConn()
  const [invitationData, setInvitationData] = useState('')
  const [statusCreateInv, errorCreateInv, startCreateInvHandler] =
    usePostConnCreateInvitation()
  const [lastConnId, setLastConnId] = useState('')
  const [statusReceiveInv, setStatusReceiveInv] = useState('idle')
  const [errorReceiveInv, startReceiveInvHandler] =
    usePostConnReceiveInvitation()
  const [pasted, setPasted] = useState('')

  const [statusDelete, deleteError, startDelete] = useDeleteConnections()

  const isConnected = (agent, data = false) => {
    if (!data) return false
    const connectionFound = data.find(({ their_label, state }) => {
      const hasConnection = their_label.includes(agent)
      const isActive = state === 'active'
      return hasConnection && isActive
    })

    if (!connectionFound) return false

    setCAAConnected(true)
    return true
  }

  useEffect(() => {
    const createConnection = (agent, data) => {
      const connected = isConnected(agent, data?.results)
      if (!['licensee', 'holder'].includes(AGENT_LABEL) || connected) {
        return null
      }
      // TODO origin should be an env var for CAA
      startCreateInvHandler(CAA_ENDPOINT, agent, (invitationId) => {
        startReceiveInvHandler(
          origin,
          invitationId,
          agent,
          setStatusReceiveInv,
          setLastConnId
        )
      })
      setCAAConnected(true)
    }
    const setStoreDataFn = (resData) => {
      setDataConnections(resData)
      if (!caaConnected) {
        createConnection('authority', resData)
      }
    }
    const intervalIdFetch = startGetConnectionsHandler(origin, setStoreDataFn)
    if (statusConnections !== 'started') clearInterval(intervalIdFetch)
    // why we are returing a function rather than clearInterval(var)?
    return function clear() {
      return clearInterval(intervalIdFetch)
    }
  }, [
    origin,
    statusConnections,
    startGetConnectionsHandler,
    caaConnected,
    startCreateInvHandler,
    startReceiveInvHandler,
  ])

  const clickCreateInvHandler = (e) => {
    e.stopPropagation()
    const setStoreDataFn = (resData) => setInvitationData(resData)
    if (statusCreateInv !== 'fetching' || statusCreateInv !== 'error') {
      startCreateInvHandler(origin, AGENT_LABEL, setStoreDataFn)
    }
  }

  const clickReceiveInvitationHandler = (e) => {
    e.stopPropagation()
    const setStatusValFn = (statusVal) => setStatusReceiveInv(statusVal)
    const setStoreDataFn = (resData) => setLastConnId(resData)
    if (statusReceiveInv !== 'fetching' || statusReceiveInv !== 'error') {
      startReceiveInvHandler(
        origin,
        pasted,
        AGENT_LABEL,
        setStatusValFn,
        setStoreDataFn
      )
      setPasted('')
    }
  }

  const toggleSuccessShowHandler = (e) => {
    e.preventDefault()
    setStatusReceiveInv('idle')
  }

  const setReceiveInvObjHandler = (e) => {
    e.preventDefault()
    setPasted(e.target.value)
  }

  const deleteHandler = (cId) => {
    const setStoreDataFn = () => {}
    startDelete(origin, cId, setStoreDataFn)
  }

  return (
    <>
      <div className="col-md-4">
        <div className="col-md-12">
          <div className="float-right">
            <ul className="nav nav-pills m-1 p-1">
              {children && children}
              {!children && serverStatus !== 'fetched' && (
                <li className="nav-item nav-link p-0 m-1"> &nbsp; </li>
              )}
              {!children && serverStatus === 'fetched' && (
                <li className="nav-item">
                  {dataConnections && (
                    <div className="btn-group nav-link p-0 m-1">
                      <a
                        className="text-primary"
                        data-toggle="dropdown"
                        href="#/"
                        role="button"
                      >
                        <ConnectionsActiveCount data={dataConnections} />
                      </a>
                      <span> &nbsp;Connection(s) </span>
                      <div
                        className="dropdown-menu"
                        style={{ minWidth: '340px', marginLeft: '-170px' }}
                      >
                        <Connections data={dataConnections} />
                      </div>
                    </div>
                  )}
                </li>
              )}
              {!children &&
                serverStatus === 'fetched' &&
                statusDelete !== 'error' &&
                dataConnections?.results?.length > 0 && (
                  <ConnectionAvatar
                    data={dataConnections}
                    onDelete={deleteHandler}
                  />
                )}
              <li className="nav-item small">
                <div className="btn-group">
                  <a
                    className="nav-link p-1 m-1 bg-primary text-light"
                    data-toggle="dropdown"
                    href="#/"
                    role="button"
                    aria-haspopup="false"
                  >
                    <i className="d-block fa fa-lg fa-plus" />
                  </a>
                  <div
                    className="dropdown-menu"
                    style={{ minWidth: '240px', marginLeft: '-205px' }}
                  >
                    <div className="dropdown-divider" />
                    <form className="m-2">
                      <div className="form-group">
                        <button
                          className="btn btn-primary w-100"
                          onClick={clickCreateInvHandler}
                          type="submit"
                        >
                          <i className="fa fa-plus-square-o fa-fw" />
                          &nbsp;Create Invitation{' '}
                        </button>{' '}
                        <br /> <br />
                        <input
                          className="w-100 my-2 small"
                          value={invitationData}
                          onChange={() => {}}
                          id="invitation"
                          style={{ overflow: 'scroll' }}
                        />
                        <label className="w-100 justify-content-start">
                          Copy &amp; paste to other agents:
                        </label>
                        <textarea
                          className="form-control my-2"
                          value={pasted}
                          onChange={setReceiveInvObjHandler}
                          placeholder=""
                          rows={3}
                        />
                        <button
                          className="btn btn-primary w-100"
                          onClick={clickReceiveInvitationHandler}
                          type="submit"
                        >
                          <i className="fa fa-floppy-o fa-fw" />
                          &nbsp;Receive Invitation{' '}
                        </button>
                        <button
                          className="btn btn-primary w-100 d-none"
                          type="submit"
                        >
                          <i className="fa fa-floppy-o fa-fw" />
                          &nbsp;Paste Invitation{' '}
                        </button>
                        <button
                          className="btn btn-primary w-100 mt-2 d-none"
                          type="submit"
                        >
                          <i className="fa fa-handshake-o fa-fw" />
                          &nbsp;OK{' '}
                        </button>
                      </div>
                    </form>
                    <div className="dropdown-divider" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className={`modal ${statusReceiveInv === 'fetched' ? '' : 'd-none'}`}
        id="success"
        style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="alert-success rounded">
              <div className="modal-header">
                <h5 className="modal-title"> </h5>
                <button
                  onClick={toggleSuccessShowHandler}
                  type="button"
                  className="close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="my-3">
                  <i className="fa fa-check ml-0 mr-2" aria-hidden="true"></i>
                  Success! Connection ID: <small>{lastConnId}</small>
                </div>
              </div>
              <div className="modal-footer" data-dismiss="modal">
                <button
                  onClick={toggleSuccessShowHandler}
                  href="#/"
                  type="button"
                  className="btn btn-primary"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={errorConnections ? 'd-block' : 'd-none'}
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
          <small>{errorConnections}</small>{' '}
        </div>
      </div>
      <div
        className={errorCreateInv ? 'd-block' : 'd-none'}
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
          <small>{errorCreateInv}</small>{' '}
        </div>
      </div>
      <div
        className={errorReceiveInv ? 'd-block' : 'd-none'}
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
          <small>{errorReceiveInv}</small>{' '}
        </div>
      </div>
      <div
        className={deleteError ? 'd-block' : 'd-none'}
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
          <small>{deleteError}</small>{' '}
        </div>
      </div>
    </>
  )
}
