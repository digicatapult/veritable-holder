/**
 * This function is used to render the popup that is shown when the user is not
 * logged in. The user gets redirected to Auth0 in a couple of seconds.
 * @returns A popup that is displayed when the user is not authenticated.
 */
export default function AuthRedirectPopup() {
  const clickLeaveHandler = () => window.close()
  return (
    <div
      className="modal show"
      id="error"
      aria-modal="true"
      style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-title">
            <div className="text-center p-3 bg-light">Loading...</div>
          </div>
          <div className="modal-body">
            <div className="text-center font-weight-bold my-3">
              <div className="text-primary my-2">
                <span className="fa-stack fa-2x">
                  <i className="fa fa-square fa-2x fa-stack-1x" />
                  <i className="fa fa-spinner fa-inverse fa-sm fa-pulse fa-stack-1x text-info" />
                </span>
              </div>
              <div className="font-weight-bold lead my-3">
                <span>Hang Tight !</span>
              </div>
              <div className="lead">
                You are being redirected to the auth0 page, just wait ~3 seconds
                or close...
              </div>
            </div>
          </div>
          <div className="modal-footer " data-dismiss="modal">
            <button
              href="#/"
              onClick={clickLeaveHandler}
              type="button"
              className="btn btn-outline-dark"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
