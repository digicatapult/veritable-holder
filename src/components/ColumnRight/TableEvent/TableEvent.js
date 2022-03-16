/**
 * This function renders a table row for each event in the events credential
 * exchange array
 */
import ReactJson from 'react-json-view'

export default function TableEvent({ i, j, k, eId, cId, event }) {
  const getTime = (str) => {
    return new Date(str).toLocaleTimeString()
  }
  const getShortenId = (str) => {
    return `${str.substr(0, 2)}…${str.substr(34, 36)}`
  }
  const getPredicate = (byFormatObj) => {
    const predicatesObj = byFormatObj?.pres_request?.indy?.requested_predicates
    const firstPredicate = Object.entries(predicatesObj)[0]
    const predicateKeyStr = firstPredicate[0].split('_')[1]
    const predicateName =
      predicateKeyStr[0].toUpperCase() + predicateKeyStr.substr(1)
    const predicateType = firstPredicate[1].p_type === '>=' ? '≥' : ''
    const predicateVal = firstPredicate[1].p_value + ''
    return predicateName + predicateType + predicateVal
  }
  const getEventIcon = (state) => {
    if (state === 'request-sent' || state === 'presentation-sent') {
      return 'fa-envelope text-warning'
    }
    if (state === 'presentation-received' || state === 'request-received') {
      return 'fa-envelope-open text-warning'
    }
    if (state === 'done') {
      return 'fa-check-circle text-success'
    }
    if (state === 'abandoned') {
      return 'fa-trash text-danger'
    }
    return 'fa-question-circle text-secondary'
  }
  const getDefIdFull = (byFormatObj) => {
    return byFormatObj.pres?.indy?.identifiers[0]?.cred_def_id
  }
  const getDefId = (byFormatObj) => {
    const defId = byFormatObj.pres?.indy?.identifiers[0]?.cred_def_id
    return `${defId?.substr(0, 2)}…${defId?.substr(-2)}`
  }

  return (
    <>
      <table className="table table-sm mb-0">
        <tbody>
          <tr className="small">
            <td rowSpan={3}>
              <i className={`fa fa-lg ${getEventIcon(event.state)}`} />
            </td>
            <td>
              <b>State: </b>
              {event.state}
            </td>
            <td>
              <b>Created: </b>
              {getTime(event.created_at)}
            </td>
            <td>
              <b>Updated: </b>
              {getTime(event.updated_at)}
            </td>
          </tr>
          <tr className="small">
            <td>
              <b>Initiator: </b>
              {event.initiator}
            </td>
            <td>
              <b>Predicate: </b>
              {getPredicate(event.by_format)}
            </td>
            <td>
              <b>ConnId: </b>
              <a
                href="/#"
                onClick={(e) => e.preventDefault()}
                title={cId}
                className="text-primary"
              >
                {getShortenId(cId)}
              </a>
            </td>
          </tr>
          <tr className="small">
            <td>
              <b>Role: </b>
              {event.role}
            </td>
            <td>
              <b>DefId: </b>
              <a
                href="/#"
                className="text-primary"
                onClick={(e) => e.preventDefault()}
                title={getDefIdFull(event.by_format)}
              >
                {getDefId(event.by_format)}
              </a>
            </td>
            <td>
              <b>ExId: </b>
              <a
                href="/#"
                className="text-primary"
                onClick={(e) => e.preventDefault()}
                title={eId}
              >
                {getShortenId(eId)}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="bg-light">
        <a
          className="text-primary collapsed"
          href={`#details-${i}-${j}-${k}`}
          data-toggle="collapse"
          aria-expanded="false"
        >
          <small>Details</small>
        </a>
        <div className="collapse" id={`details-${i}-${j}-${k}`}>
          <div className="pre-scrollable bg-white" style={{ height: '150px' }}>
            <ReactJson
              src={event}
              style={{ fontSize: '0.75em' }}
              name={'record'}
              displayDataTypes={false}
              displayObjectSize={false}
              iconStyle={'square'}
              indentWidth={2}
            />
          </div>
        </div>
      </div>
    </>
  )
}
