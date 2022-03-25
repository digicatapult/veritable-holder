/**
 * It creates a card for each credential in the wallet.
 * @returns The `CredentialSetItem` component returns a `div` and `card` element.
 * The `card` element has a `card-header` element with a `text-white bg-secondary`
 * class.
 */
import { useState } from 'react'
import useGetConn from '../../../interface/hooks/use-get-conn'
import usePostPresentProofSendProposal from '../../../interface/hooks/use-post-present-proof-send-proposal'
import { AUTHORITY_LABEL } from '../../../utils/env'

export default function CredentialSetItem({
  origin,
  item: {
    cred_def_id,
    referent,
    attrs: {
      timestamp,
      id,
      name,
      surname,
      type,
      title,
      subtitle,
      expiration_dateint: expiry,
    },
  },
  index,
  records,
}) {
  const [isDisconnected, setIsDisconnected] = useState(false)
  const [lastProposalId, setLastProposalId] = useState('')
  const [statusConnId, errorConnId, startFetchConnIdHandler] = useGetConn()
  const [errorProposal, startFetchHandler] = usePostPresentProofSendProposal()
  const [statusSendProposal, setStatusSendProposal] = useState('')

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

  const alreadyProposed = () => {
    return records?.some((record) => {
      return record.pres_proposal?.comment === referent
    })
  }

  return (
    /*
		const itemExample = {
			"referent": "b6554d6f-bb33-41a0-8230-7ad54e4fe069",
			"attrs": {
				"timestamp": "1635774312",
				"id": "GBR-RP-1", "name": "Alice", "surname": "Smith", "type": "2",
				"title": "Unmanned Aircraft Sys", "subtitle": "Drone Cert of Competence",
				"expiration_dateint": "20211130"
			},
			"schema_id": "TeuuXEe35wsnTB3SZVdzfL:2:drone schema:8.33",
			"cred_def_id": "TeuuXEe35wsnTB3SZVdzfL:3:CL:12:Consortiq.agent.drone_schema",
			"rev_reg_id": null, "cred_rev_id": null
		}
		*/
    <>
      <div className="card-header text-white bg-secondary">
        Credential Wallet Entry #{index + 1}
      </div>
      <div className="card-body">
        <p className="card-text mt-2 small">
          Timestamp:&nbsp;
          <a
            href="/#"
            onClick={(e) => e.preventDefault()}
            title={timestamp}
            className="text-primary"
          >
            {new Date(timestamp * 1000)
              .toISOString()
              .slice(0, 19)
              .replace('T', ' ')}
          </a>
          &nbsp;|&nbsp; DefId:&nbsp;
          <a
            href="/#"
            onClick={(e) => e.preventDefault()}
            title={cred_def_id}
            className="text-primary"
          >
            {cred_def_id.slice(0, 2)}…:{cred_def_id.split(':')[4]}
          </a>
        </p>
        <div className="row">
          <div className="col-lg-3 order-2 order-lg-1">
            <i className="fa fa-id-card-o fa-4x" />
          </div>
          <div
            className={
              'd-flex flex-column ' +
              'justify-content-center p-0 ' +
              'col-lg-9 order-1 order-lg-2'
            }
          >
            <div className="m-0 p-0">
              <h2 className="m-0">Flyer ID</h2>
              <h3 className="m-0 text-muted">{id}</h3>
            </div>
          </div>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <div className="row small text-dark">
            <div className="col-md-6 text-uppercase text-muted">Name:</div>
            <div className="col-md-6">{name}</div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row small text-dark">
            <div className="col-md-6 text-uppercase text-muted">Surname:</div>
            <div className="col-md-6">{surname}</div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row small text-dark">
            <div className="col-md-6 text-uppercase text-muted">Type:</div>
            <div className="col-md-6">A{type} Open Category</div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row small text-dark">
            <div className="col-md-6 text-uppercase text-muted">
              Certificate Title:
            </div>
            <div className="col-md-6">{title}</div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row small text-dark">
            <div className="col-md-6 text-uppercase text-muted">
              Certificate Subtitle:
            </div>
            <div className="col-md-6">{subtitle}</div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row small text-dark">
            <div className="col-md-6 text-uppercase text-muted">
              Expires On:
            </div>
            <div
              className={`col-md-6 text-success ${
                new Date(
                  `${expiry.substr(0, 4)}-${expiry.substr(
                    4,
                    2
                  )}-${expiry.substr(6, 2)}`
                ) < new Date()
                  ? 'text-danger'
                  : ''
              }`}
            >
              {`${expiry.substr(0, 4)}-${expiry.substr(4, 2)}-${expiry.substr(
                6,
                2
              )}`}
            </div>
          </div>
        </li>
      </ul>
      <div className="text-center p-2">
        <button
          type="button"
          className="btn btn-primary w-50"
          onClick={submitHandler}
          disabled={alreadyProposed()}
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
        className={`${errorConnId || errorProposal ? 'd-block' : 'd-none'}`}
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
            Failed to fetch: {errorConnId}
            {errorProposal}
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
