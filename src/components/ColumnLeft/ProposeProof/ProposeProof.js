/**
 * Request license button for a test pass credential
 */
import { useEffect, useState } from 'react'
import useGetConn from '../../../interface/hooks/use-get-conn'
import usePostPresentProofSendProposal from '../../../interface/hooks/use-post-present-proof-send-proposal'
import useGetLoopedPresentProofRecords from '../../../interface/hooks/use-get-looped-present-proof-records'
import { AUTHORITY_LABEL } from '../../../utils/env'

export default function ProposeProof({
  origin,
  item: {
    referent,
    attrs: { id, type },
  },
}) {
  const [proposals, setProposals] = useState(null)
  const [isDisconnected, setIsDisconnected] = useState(false)
  const [lastProposalId, setLastProposalId] = useState('')
  const [statusSendProposal, setStatusSendProposal] = useState('')
  const [alreadyProposed, setAlreadyProposed] = useState('')

  const [statusConnId, errorConnId, startFetchConnIdHandler] = useGetConn()
  const [errorProposal, startFetchHandler] = usePostPresentProofSendProposal()
  const [statusRecordEvents, errorRecordEvents, startGetRecordsHandler] =
    useGetLoopedPresentProofRecords()
  console.log(proposals)
  useEffect(() => {
    const intervalRecordsFetch = startGetRecordsHandler(
      origin,
      'proposal-sent',
      setProposals
    )
    setAlreadyProposed(
      proposals?.some((proposal) => proposal.pres_proposal.comment === referent)
    )

    if (statusRecordEvents !== 'started') clearInterval(intervalRecordsFetch)
    return function clear() {
      return clearInterval(intervalRecordsFetch)
    }
  }, [origin, startGetRecordsHandler, statusRecordEvents, proposals, referent])

  const toggleSuccessShowHandler = () => {
    setStatusSendProposal('idle')
  }

  const onSubmit = (connectionId) => {
    startFetchHandler(
      origin,
      connectionId,
      id,
      type,
      referent,
      setStatusSendProposal,
      setLastProposalId
    )
  }

  const submitHandler = () => {
    const connIdCb = (connectionId) => {
      if (!connectionId) {
        setIsDisconnected(true)
        return
      }
      onSubmit(connectionId)
    }
    setIsDisconnected(false)
    startFetchConnIdHandler(origin, connIdCb, AUTHORITY_LABEL)
  }

  return (
    <>
      <div className="text-center p-2">
        <button
          type="button"
          className="btn btn-primary w-50"
          onClick={submitHandler}
          disabled={alreadyProposed}
        >
          {statusConnId === 'fetching' && (
            <>
              <i className="fa fa-spinner fa-pulse"></i>
            </>
          )}
          &nbsp;Request License&nbsp;
          {isDisconnected && (
            <>
              <span className="small">
                ( &nbsp;
                <i className="fa fa-exclamation-triangle"></i>
                &nbsp; disconnected )
              </span>
            </>
          )}
        </button>
      </div>
      <div
        className={`${
          errorConnId || errorProposal || errorRecordEvents
            ? 'd-block'
            : 'd-none'
        }`}
        style={{
          position: 'fixed',
          width: '10%',
          height: '10%',
          inset: '0px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 100,
        }}
      >
        <div className="text-light m-2 p-2">
          <small>
            {errorConnId}
            {errorProposal}
            {errorRecordEvents}
          </small>
        </div>
      </div>
      <div
        id="success"
        className={`modal ${statusSendProposal === 'fetched' ? '' : 'd-none'}`}
        style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="alert-success rounded">
              <div className="modal-header">
                <h5 className="modal-title">&nbsp;</h5>
                <button
                  type="button"
                  onClick={toggleSuccessShowHandler}
                  className="close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="my-3">
                  <i className="fa fa-check ml-0 mr-2"></i>
                  Success! Proposal ID: <small>{lastProposalId}</small>
                </div>
              </div>
              <div className="modal-footer" data-dismiss="modal">
                <button
                  type="button"
                  onClick={toggleSuccessShowHandler}
                  className="btn btn-primary"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
