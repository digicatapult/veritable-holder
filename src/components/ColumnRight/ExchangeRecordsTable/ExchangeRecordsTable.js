/**
 * This function is responsible for rendering the Exchange Records table
 * @returns A table of events related to a connection id.
 */
import TableEvent from '../TableEvent'

export default function ExchangeRecordsTable({ dataConnRecordEvents }) {
  return (
    <>
      {dataConnRecordEvents.length === 0 && (
        <>
          <div className="text-dark">N/A</div>
        </>
      )}

      {dataConnRecordEvents.length > 0 &&
        dataConnRecordEvents.map((o, i) => {
          const [cId, exRecordEvents] = Object.entries(o)[0]
          return (
            <div key={i} className="my-2" id={`connection-${i}`}>
              {dataConnRecordEvents.length > 1 && (
                <h6>
                  Events related to Connection Id <small>{cId}</small>:
                </h6>
              )}

              {exRecordEvents.length > 0 &&
                exRecordEvents.map((p, j) => {
                  const [eId, events] = Object.entries(p)[0]
                  return (
                    <div key={j} id={`wrapper-${i}-${j}`}>
                      {events.length > 1 && (
                        <a
                          className="btn btn-dark text-left w-100"
                          href={`#details-${i}-${j}`}
                          data-toggle="collapse"
                          aria-expanded="true"
                        >
                          <i className="fa fa-sort"></i>
                          &nbsp; Ex Id: <small>{eId}</small>
                        </a>
                      )}

                      {events.length > 0 && (
                        <div
                          className="my-0 p-2 border collapse show"
                          id={`details-${i}-${j}`}
                        >
                          {events.map((event, k) => (
                            <div
                              key={k}
                              className="table-responsive"
                              id={`table-${i}-${j}-${k}`}
                            >
                              <TableEvent
                                i={i}
                                j={j}
                                k={k}
                                eId={eId}
                                cId={cId}
                                event={event}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          )
        })}
    </>
  )
}
