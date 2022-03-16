/**
 * This function is used to display the present-proof exchange records log maintained by holder
 */
import { useEffect, useState } from 'react'
import ExchangeRecordsTable from '../ExchangeRecordsTable'
import useGetLoopedPresentProofRecords from '../../../interface/hooks/use-get-looped-present-proof-records'

export default function ColumnRightWrap({ origin }) {
  /**
		const dataConnRecordEventsExample = [ { "conn_id": [ { "ex_id_01":["event123"] }, { "ex_id_02":[".."] } ] } ]
	*/

  const [dataConnRecordEvents, setDataConnRecordEvents] = useState([])
  const [statusRecordEvents, errorRecordEvents, startGetRecordsHandler] =
    useGetLoopedPresentProofRecords()

  useEffect(() => {
    const setDataFn = (resRecordsData) => {
      setDataConnRecordEvents((prevData) => {
        prevData = [...prevData]
        resRecordsData.forEach((record) => {
          const {
            connection_id: connId,
            pres_ex_id: exId,
            updated_at: updatedAt,
          } = record

          let connIdIndex = prevData.findIndex((c) => connId in c)
          if (connIdIndex === -1) {
            connIdIndex = prevData.push({ [connId]: [] }) - 1
          }
          const exRecordEvents = prevData[connIdIndex][connId]

          let exIdIndex = exRecordEvents.findIndex((r) => exId in r)
          if (exIdIndex === -1) {
            exIdIndex = exRecordEvents.push({ [exId]: [] }) - 1
          }
          const events = exRecordEvents[exIdIndex][exId]

          let eventIndex = events.findIndex((e) => updatedAt === e.updated_at)
          if (eventIndex > -1) {
            return
          }
          eventIndex = events.findIndex(
            (e) => new Date(updatedAt) < new Date(e.updatedAt)
          )
          events.splice(eventIndex > -1 ? eventIndex : events.length, 0, record)
        })
        return prevData
      })
    }
    const intervalRecordsFetch = startGetRecordsHandler(origin, setDataFn)
    if (statusRecordEvents !== 'started') clearInterval(intervalRecordsFetch)
    return function clear() {
      return clearInterval(intervalRecordsFetch)
    }
  }, [origin, startGetRecordsHandler, statusRecordEvents])

  return (
    <>
      <div className="col-md-6">
        <div className="container py-1">
          <div className="row">
            <div className="col-md-12">
              <h5> My Proof Exchange Records </h5>

              <p className="small">
                View all present-proof records ( &nbsp;
                <b>
                  Config – Automatically reply to proof request
                  <a
                    href="/#"
                    onClick={(e) => e.preventDefault()}
                    className="text-primary"
                  >
                    &nbsp; ON &nbsp;
                  </a>
                </b>
                ) :
              </p>

              <ExchangeRecordsTable
                dataConnRecordEvents={dataConnRecordEvents}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={errorRecordEvents ? 'd-block' : 'd-none'}
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
          <small>{errorRecordEvents}</small>{' '}
        </div>
      </div>
    </>
  )
}
