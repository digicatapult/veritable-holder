/**
 * This function is used to display the connection details in the connections list
 * @returns A list of connection items.
 */
export default function ConnectionAvatar({ data, onDelete }) {
  const isDate = (d) => {
    return new Date(d) !== 'Invalid Date' && !isNaN(new Date(d))
  }
  const shortenDate = (d) => {
    return isDate(d) ? new Date(d).toLocaleString() : d
  }
  const from = [
    'created_at',
    'updated_at',
    'alias',
    'invitation_key',
    'connection_id',
    'my_did',
    'request_id',
    'state',
    'their_role',
  ]
  const to = [
    'Created@:',
    'Updated@:',
    'Alias:',
    'InvKey:',
    'ConnId:',
    'MyDID:',
    'ReqId:',
    'State:',
    'TheirRole:',
  ]
  const arrReduceEntries = (conn) => {
    return Object.entries(conn)
      .sort(([a], [b]) => a.localeCompare(b))
      .reduce((a, [k, v]) => {
        if (from.indexOf(k) > -1) {
          return [...a, [to[from.indexOf(k)], shortenDate(v)]]
        } else {
          return [...a]
        }
      }, [])
  }
  return (
    <>
      {data?.results
        ?.filter((d) => d.state === 'active')
        .map((c) => {
          return (
            <li key={c.connection_id} className="nav-item small">
              <div className="btn-group">
                <a
                  className="p-1 m-1 text-primary bg-light"
                  href="#/"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="d-block fa fa-lg fa-handshake-o" />
                </a>
                <div
                  className="dropdown-menu"
                  style={{ minWidth: '310px', marginLeft: '-200px' }}
                >
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-12">
                          <button
                            className="btn btn-primary w-100"
                            onClick={() => {
                              onDelete(c.connection_id)
                            }}
                          >
                            <i className="fa fa-trash-o" aria-hidden="true" />
                            &nbsp; Disconnect
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <ul className="list-group list-group-flush">
                    <>
                      <li className="list-group-item">
                        <div className="row">
                          <div className="col-md-12 small text-break">
                            <b>Details:</b>
                          </div>
                        </div>
                      </li>

                      {arrReduceEntries(c).map(([key, val]) => (
                        <li
                          key={key}
                          className="list-group-item small text-break"
                        >
                          <div className="row">
                            <div className="col-md-4">{key}</div>
                            <div className="col-md-8">{val}</div>
                          </div>
                        </li>
                      ))}
                    </>
                  </ul>
                </div>
              </div>
            </li>
          )
        })}
    </>
  )
}
