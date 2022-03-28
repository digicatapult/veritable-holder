/**
 * This function takes in a data object and returns a list with connection information
 * @returns A list of information details.
 */
export default function Connections({ data }) {
  const arrReduceActive = (d) =>
    d.results.reduce((acc, obj) => acc + (obj.state === 'active'), 0)
  const arrReduceInvitation = (d) =>
    d.results.reduce((acc, obj) => acc + (obj.state === 'invitation'), 0)
  const arrReduceRequest = (d) =>
    d.results.reduce((acc, obj) => acc + (obj.state === 'request'), 0)
  return (
    <>
      <ul className="list-group">
        <li className="list-group-item p-1">
          Active <span className="lead">{arrReduceActive(data)}</span> |
          Invitation <span className="lead">{arrReduceInvitation(data)}</span> |
          Request <span className="lead">{arrReduceRequest(data)}</span>
        </li>
      </ul>
      <ul className="list-group">
        {data.results.map((c, i) => {
          const t = new Date(c.created_at).toLocaleTimeString()
          const r = c.their_role
          const s = c.state
          const _ = c.connection_id.split('-')
          return (
            <li key={c.connection_id} className="list-group-item small p-1">
              <small>{i} | &nbsp;</small>
              <small>{t} | &nbsp;</small>
              <small>{r} | &nbsp;</small>
              <small>{s} | &nbsp;</small>
              <small>
                {_[0]}..{_[4]}
              </small>
            </li>
          )
        })}
      </ul>
    </>
  )
}
