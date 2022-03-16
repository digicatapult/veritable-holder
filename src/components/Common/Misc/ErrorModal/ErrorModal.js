/**
 * This function is a React component that displays an error modal
 * @returns An error modal with a body and a footer.
 */
export default function ErrorModal({ children, visibility, content }) {
  const clickReloadHandler = () => {
    window.location.reload()
  }
  return (
    <div
      className={`modal ${visibility ? 'show' : ''}`}
      id="error"
      aria-modal="true"
      style={
        visibility
          ? { display: 'block', backgroundColor: 'rgb(0,0,0,0.5)' }
          : {}
      }
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="my-3">{children || content}</div>
          </div>
          <div className="modal-footer" data-dismiss="modal">
            <button
              href="#/"
              onClick={clickReloadHandler}
              type="button"
              className="btn btn-danger"
            >
              Reload
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
