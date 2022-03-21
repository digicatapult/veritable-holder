/**
 * This function is used to display the present-proof exchange records log maintained by holder
 */
import ExchangeRecordsTable from '../ExchangeRecordsTable'

export default function ColumnRightWrap({ dataConnRecordEvents }) {
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
    </>
  )
}
