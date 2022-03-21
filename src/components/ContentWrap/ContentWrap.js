/**
 * This function returns a div that contains the left and right columns for issuer
 * @returns An empty element with the left and right column inside.
 */
import { useEffect, useState } from 'react'
import ColumnLeftWrap from './../ColumnLeft/ColumnLeftWrap'
import ColumnRightWrap from './../ColumnRight/ColumnRightWrap'
import useGetLoopedPresentProofRecords from '../../interface/hooks/use-get-looped-present-proof-records'

export default function ContentWrap({ origin }) {
  const [records, setRecords] = useState(null)
  const [dataConnRecordEvents, setDataConnRecordEvents] = useState([])
  const [statusRecordEvents, errorRecordEvents, startGetRecordsHandler] =
    useGetLoopedPresentProofRecords()

  useEffect(() => {
    const setDataFn = (resRecordsData) => {
      setRecords(resRecordsData)
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
      <ColumnLeftWrap origin={origin} records={records} />
      <ColumnRightWrap dataConnRecordEvents={dataConnRecordEvents} />

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
          <small>{errorRecordEvents}</small>
        </div>
      </div>
    </>
  )
}
