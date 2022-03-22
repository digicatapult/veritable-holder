/**
 * This function is used to display a popup when the user is logged out
 * @returns A popup that is displayed when the user logs out.
 */
import { useAuth0 } from '@auth0/auth0-react'

export default function AuthLoggedOutPopup() {
  const { loginWithRedirect } = useAuth0()
  const clickLoginHandler = () => {
    loginWithRedirect()
  }
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
            <div className="text-center p-3 bg-light">Waiting...</div>
          </div>
          <div className="modal-body">
            <div className="text-center font-weight-bold my-3">
              <div className="text-primary my-2">
                <span className="fa-stack fa-2x">
                  <i className="fa fa-square fa-2x fa-stack-1x" />
                  <i className="fa fa-unlock fa-inverse fa-sm fa-stack-1x text-info" />
                </span>
              </div>
              <div className="small lead my-3">
                <span>You have successfully logged out!</span>
              </div>
              <div className="lead">Try again or close this page...</div>
            </div>
          </div>
          <div className="modal-footer " data-dismiss="modal">
            <button
              href="#/"
              onClick={clickLoginHandler}
              type="button"
              className="btn btn-outline-dark mx-auto"
            >
              Log back in to your account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
