/**
 * This function creates a navbar with a dark background and a primary color
 * @returns A navbar with a container and a button.
 */
export default function NavWrap({ children }) {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary">
      <div className="container">
        <button
          className="navbar-toggler navbar-toggler-right border-0"
          data-toggle="collapse"
          data-target="#navbar18"
          type="button"
          style={{ minHeight: '94px' }}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbar18">
          {children}
        </div>
      </div>
    </nav>
  )
}
